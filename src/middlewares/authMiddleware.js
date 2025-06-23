import {createError} from "../utils/createError.js";
import jwt, { decode } from "jsonwebtoken";

export const authCheckUser = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      createError(401, "Token is missing");
    }
    const token = header.split(" ")[1];

    jwt.verify(token, process.env.SECRET, (error, decode));
    if (error) {
      createError(401, "Token is invalid");
    }
    req.user = decode
    next()
  } catch (error) {
    next(error)
  }
};


export const authCheckDoctor = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      createError(401, "Token is missing");
    }
    const token = header.split(" ")[1];

    jwt.verify(token, process.env.SECRET, (error, decode));
    if (error) {
      createError(401, "Token is invalid");
    }
    req.doctor = decode
    next()
  } catch (error) {
    next(error)
  }
};
