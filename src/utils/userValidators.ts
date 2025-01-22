import { body } from "express-validator";

export const createUserValidator = [
  body("email", "Invalid login min length should be 6 characters").isString().isLength({ min: 6 }),
  body("password", "Invalid password min length is 6 characters").isString().isLength({ min: 6 }),
];
