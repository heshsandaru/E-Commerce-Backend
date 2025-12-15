import { APIError } from "../errors/ApiError";
import { ProductModel } from "../models/ProductModel";
import { NextFunction, Request, Response } from "express";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error: any) {
        next(new APIError(400, error.message));
    }
};

// Get all products
export const getProduct = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductModel.find().sort({ _id: -1 }); // Descending order
        res.json(products);
    } catch (error: any) {
        next(new APIError(500, error.message));
    }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error: any) {
        next(new APIError(500, error.message));
    }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error: any) {
        next(new APIError(400, error.message));
    }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
        next(new APIError(500, error.message));
    }
};