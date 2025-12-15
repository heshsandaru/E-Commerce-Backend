import { Router } from "express";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";


const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/products", productRouter);


export default rootRouter;