import prisma from "../config/prisma.js";

export const UserMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findMany({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
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
    const doctorUser = await prisma.doctor.findFirst({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
      },
    });
    res.json({ message: "doctor me", result: doctorUser });
  } catch (error) {
    next(error);
  }
};

export const updatedHealthRec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const healthRecord = await prisma.healthRecord.update({
      where: {
        id: Number(id),
      },
      data: {
        healthRecord,
      },
    });
    res.json({ message: `Update health record success` });
  } catch (error) {
    next(error);
  }
};

export const updatedDoctor = async (req, res, next) => {
  try {
    const { username, password, specialization } = req.body;
    const updateDoctor = await prisma.doctor.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        password,
        specialization,
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
