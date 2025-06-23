import express from "express";
import {
  authCheckDoctor,
  authCheckUser,
} from "../middlewares/authMiddleware.js";
import {
  deleteHealthRec,
  DoctorMe,
  updatedDoctor,
  updatedHealthRec,
  UserMe,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/users/me", authCheckUser, UserMe);
// router.patch("/users/me", authCheckUser);

// //doctor
router.get("/doctors/me", authCheckDoctor, DoctorMe);
router.patch("/doctors/me", authCheckDoctor, updatedDoctor);

// //healthRecord
// router.post("/health-records",authCheckUser)
// router.get("/health-records",authCheckUser)
// router.get("/health-records/:id",authCheckUser)
router.patch("/health-records/:id", authCheckUser, updatedHealthRec);
router.delete("/health-records/:id", authCheckUser, deleteHealthRec);

// // Doctor Notes
// router.post("/doctor-notes",authCheckDoctor)
// router.get("/doctor-notes/my-notes",authCheckDoctor)
// router.patch("/dortor-notes/:id",authCheckDoctor)
// router.delete("/doctor-notes/:id",authCheckDoctor)

export default router;
