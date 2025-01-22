import { Router } from "express";
import { createUserValidator } from "../utils/userValidators";
import { handleValidationErrors } from "../utils/handleValidationErrors";
import { httpCreateUser } from "../controllers/userController";

export const userRouter = Router();

userRouter.post(
  "/sign-up/",
  createUserValidator,
  handleValidationErrors,
  httpCreateUser
);
