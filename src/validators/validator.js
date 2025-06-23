import { object, ref, string } from "yup";
import { createError } from "../utils/createError.js";

export const registerSchemaDoctor = object({
  username: string()
    .min(6, "username ต้องมีความยาวอย่างต่ำ 6 ตัวอักษร")
    .required("กรุณากรอก username"),
  password: string()
    .min(6, "password ต้องมีความยาวอย่างต่ำ 6 ตัวอักษร")
    .required("กรุณากรอก password"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "confirm Password ไม่ตรงกัน"),
  specialization: string().required("กรุณากรอก specialization "),
});

export const loginSchema = object({
  username: string()
    .min(6, "username is invalid")
    .required("กรุณากรอก username"),
  password: string()
    .min(6, "password is invalid")
    .required("กรุณากรอก password"),
});

export const registerSchemaUser = object({
  username: string()
    .min(6, "username ต้องมีความยาวอย่างต่ำ 6 ตัวอักษร")
    .required("กรุณากรอก username"),
  password: string()
    .min(6, "password ต้องมีความยาวอย่างต่ำ 6 ตัวอักษร")
    .required("กรุณากรอก password"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "confirm Password ไม่ตรงกัน")
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};