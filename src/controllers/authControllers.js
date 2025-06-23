import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerDoctor = async (req, res, next) => {
  try {
    const { username, password, specialization } = req.body;
    console.log(req.body);
    const doctorUser = await prisma.doctor.findUnique({
      where: {
        username: username,
      },
    });
    console.log("Alkleeeeeeeeee ", doctorUser);
    const hash = bcrypt.hashSync(password, 10);
    const result = await prisma.doctor.create({
      data: {
        username,
        password: hash,
        specialization,
      },
    });

    if (doctorUser) {
      createError(400, "username already exist");
    }
    res.status(200).json({ message: "Register successfully" });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const users = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    const hash = bcrypt.hashSync(password, 10);
    const result = await prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });

    if (users) {
      createError(400, "username already exist");
    }
     res.status(200).json({ message: "Register successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const doctorUser = await prisma.doctor.findFirst({
      where: {
        username,
      },
    });
    if (!doctorUser) {
      createError(400, "Doctor username is invalid");
    }

    console.log(doctorUser)

    const checkPassword = bcrypt.compareSync(
      password,
      doctorUser.password
    );
    if (!checkPassword) {
      createError(400, "password doesn't match");
    }

    const payload = {
      id: doctorUser.id, specialization: doctorUser.specialization
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    res.json({
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      createError(400, "user is invalid");
    }

    const checkPassword = bcrypt.compareSync(
      password,
      user.confirmPassword
    );
    if (!checkPassword) {
      createError(400, "user is invalid");
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    res.status(200).json({
      username: user.username,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
