import { number } from "yup";
import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const UserMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(req.user);
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    next(error);
  }
};

export const UpdateUserMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
        password: hash,
      },
    });
    res.status(200).json({ result: user });
  } catch (error) {
    next(error);
  }
};

export const DoctorMe = async (req, res, next) => {
  try {
    const { id } = req.doctor;
    console.log(req.doctor);
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      id: doctor.id,
      username: doctor.username,
      specialization: doctor.specialization,
    });
  } catch (error) {
    next(error);
  }
};

//health rec
export const getHealthRec = async (req, res, next) => {
  try {
    const getHealthRec = await prisma.healthRecord.findMany({});
    res.json({ result: getHealthRec });
  } catch (error) {
    next(error);
  }
};

export const getHealthRecById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getHealthRecById = await prisma.healthRecord.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.json({ result: getHealthRecById });
  } catch (error) {
    next(error);
  }
};

export const addHealthRec = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { type, value } = req.body;
    const addHealthRec = await prisma.healthRecord.create({
      data: {
        userId: id,
        type: type,
        value: value,
      },
    });
    res.json({
      message: "create health record successfully",
      result: addHealthRec,
    });
  } catch (error) {
    next(error);
  }
};

export const updatedHealthRec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, value } = req.body;
    const healthRecord = await prisma.healthRecord.update({
      where: {
        id: Number(id),
      },
      data: {
        type: type,
        value: value,
      },
    });
    res.json({ message: `Update health record success`, result: healthRecord });
  } catch (error) {
    next(error);
  }
};

export const updatedDoctor = async (req, res, next) => {
  try {
    const { id } = req.doctor;
    const { username, password, specialization } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const updateDoctor = await prisma.doctor.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
        password: hash,
        specialization: specialization,
      },
    });
    res
      .status(200)
      .json({ message: `Update doctor success`, result: updateDoctor });
  } catch (error) {
    next(error);
  }
};

export const deleteHealthRec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const healthRecord = await prisma.healthRecord.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Delete success!!" });
  } catch (error) {
    next(error);
  }
};

//note

export const postNote = async (req, res, next) => {
  try {
    const { id } = req.doctor;
    const { userId, note } = req.body;
    const postNote = await prisma.doctorNote.create({
      data: {
        userId: Number(userId),
        note: note,
        doctorId: id,
      },
    });
    res.status(200).json({
      message: "create note successfully",
      result: postNote,
    });
  } catch (error) {
    next(error);
  }
};

export const myNote = async (req, res, next) => {
  try {
    const myNote = await prisma.doctorNote.findMany({});
    res.status(200).json({
      message: "your note is here",
      result: myNote,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { note, doctorId, userId } = req.body;
    const updateNote = await prisma.doctorNote.update({
      where: {
        id: Number(id),
      },
      data: {
        note: note,
        doctorId: doctorId,
        userId: userId,
      },
    });
    res.status(200).json({
      message: "your note is here",
      result: updateNote,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteNote = await prisma.doctorNote.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Delete success!!" });
  } catch (error) {
    next(error);
  }
};
