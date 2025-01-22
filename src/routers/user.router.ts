import { RequestHandler, Router } from "express";
import { createUserValidator } from "../utils/userValidators";
import { handleValidationErrors } from "../utils/handleValidationErrors";
import { httpCreateUser, httpUserSignIn } from "../controllers/userController";

export const userRouter = Router();

userRouter.post(
  "/sign-up/",
  createUserValidator,
  handleValidationErrors,
  httpCreateUser
);


userRouter.post(
  "/sign-in/",
  createUserValidator,
  handleValidationErrors,
  httpUserSignIn
);