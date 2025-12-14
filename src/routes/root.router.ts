import { Router } from "express";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";


const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/categories", categoryRouter);


export default rootRouter;