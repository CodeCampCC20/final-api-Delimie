import express from "express";
import {
  authCheckDoctor,
  authCheckUser,
} from "../middlewares/authMiddleware.js";
import {
  deleteNote,
  myNote,
  postNote,
  updateNote,
} from "../controllers/userControllers.js";

const doctorNoteRoute = express.Router();
// Doctor Notes
doctorNoteRoute.post("/", authCheckDoctor, postNote);
doctorNoteRoute.get("/my-notes", authCheckDoctor, myNote);
// doctorNoteRoute.get("/user/:userId", authCheckDoctor);
doctorNoteRoute.patch("/:id", authCheckDoctor, updateNote);
doctorNoteRoute.delete("/:id", authCheckDoctor,deleteNote);

// User reads doctor noted
// doctorNoteRoute.get("/received", authCheckUser);

export default doctorNoteRoute;
