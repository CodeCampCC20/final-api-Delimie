import express from "express";
import {
  loginDoctor,
  loginUser,
  registerDoctor,
  registerUser,
} from "../controllers/authControllers.js";
import {
  loginSchema,
  registerSchemaDoctor,
  registerSchemaUser,
} from "../validators/validator.js";
import { validate } from "../validators/validator.js";

const authRouter = express.Router();

authRouter.post(
  "/register/doctor",
  validate(registerSchemaDoctor),
  registerDoctor
);
authRouter.post("/login/doctor", validate(loginSchema), loginDoctor);
authRouter.post("/register/user", validate(registerSchemaUser), registerUser);
authRouter.post("/login/user", validate(loginSchema), loginUser);

export default authRouter;
