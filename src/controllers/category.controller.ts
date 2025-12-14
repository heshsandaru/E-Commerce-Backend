import { APIError } from "../errors/ApiError";
import { CategoryModel } from "../models/CategoryModel";
import { NextFunction, Request, Response } from "express";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = new CategoryModel(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error: any) {
        next(new APIError(400, error.message));
    }
};

// Get all category
export const getCategory = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await CategoryModel.find().sort({ _id: -1 }); // Descending order
        res.json(categories);
    } catch (error: any) {
        next(new APIError(500, error.message));
    }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (error: any) {
        next(new APIError(500, error.message));
    }
};

// Update a category by ID
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (error: any) {
        next(new APIError(400, error.message));
    }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
        next(new APIError(500, error.message));
    }
};