import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express"
import { UserModel } from "../models/UserModel"
import jwt from "jsonwebtoken"
import { APIError } from "../errors/ApiError"

const createAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '60s' })
}

const createRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body
    const SALT = 10
    const hashedPassword = await bcrypt.hash(password, SALT)
    const user = new UserModel({
      email,
      name,
      password: hashedPassword,
    })
    await user.save()
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
    res.status(201).json(userWithoutPassword)
  } catch (err) {
    next(err)
  }
}
export const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Login request received")
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new APIError(404, "User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new APIError(401, "Invalid email or password")
    }

    const accessToken = createAccessToken(user._id.toString())
    const refreshToken = createRefreshToken(user._id.toString())

    const isProd = process.env.NODE_ENV === "production"

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days,
      path: "/api/auth/refresh-token",
    })

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
    }
    res.status(200).json(userWithoutPassword)
  } catch (err: any) {
    next(err)
  }
}