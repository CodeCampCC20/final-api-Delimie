import express from "express";
import { UpdateUserMe, UserMe } from "../controllers/userControllers.js";
import { authCheckUser } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/me", authCheckUser, UserMe);
userRouter.patch("/me", authCheckUser, UpdateUserMe);

export default userRouter;
