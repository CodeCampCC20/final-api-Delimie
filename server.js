import express from "express";
import authRouter from "./src/routes/authRoutes.js";
import doctorRouter from "./src/routes/doctorRouter.js";
import userRouter from "./src/routes/userRoutes.js";
import healthRecRouter from "./src/routes/healthRecRouter.js";
import doctorNoteRoute from "./src/routes/doctorNoteRoute.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/doctors", doctorRouter);
app.use("/health-records", healthRecRouter);
app.use("/doctor-notes", doctorNoteRoute);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
