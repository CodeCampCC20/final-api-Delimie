
import express from 'express'
import { authCheckDoctor } from '../middlewares/authMiddleware.js';
import { DoctorMe, updatedDoctor } from '../controllers/userControllers.js';

const doctorRouter = express.Router();

//doctor
doctorRouter.get("/me", authCheckDoctor, DoctorMe);
doctorRouter.patch("/me", authCheckDoctor, updatedDoctor);

export default doctorRouter