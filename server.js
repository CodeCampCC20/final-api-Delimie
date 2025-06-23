import express from "express";
import authRouter from "./src/routes/authRoutes.js";
import router from "./src/routes/userRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/auth", authRouter);
// app.use("/", router);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
