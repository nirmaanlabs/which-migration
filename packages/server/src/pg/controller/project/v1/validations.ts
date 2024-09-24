import { body } from "express-validator";

export const validateProjectBody = [
  body("projectName").notEmpty().isString(),
  body("connectionId").notEmpty().isString(),
];
