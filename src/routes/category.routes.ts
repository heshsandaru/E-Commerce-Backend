import e, { Router } from "express";
import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;