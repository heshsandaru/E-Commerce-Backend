import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express"
import { UserModel } from "../models/UserModel"

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