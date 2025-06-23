import express from "express";
import { authCheckUser } from "../middlewares/authMiddleware.js";
import {
  addHealthRec,
  deleteHealthRec,
  getHealthRec,
  getHealthRecById,
  updatedHealthRec,
} from "../controllers/userControllers.js";

const healthRecRouter = express.Router();

healthRecRouter.post("/", authCheckUser, addHealthRec);
healthRecRouter.get("/", authCheckUser, getHealthRec);
healthRecRouter.get("/:id", authCheckUser, getHealthRecById);
healthRecRouter.patch("/:id", authCheckUser, updatedHealthRec);
healthRecRouter.delete("/:id", authCheckUser, deleteHealthRec);

export default healthRecRouter;
