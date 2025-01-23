import { RequestHandler, Router } from "express";
import { createUserValidator } from "../utils/userValidators";
import { handleValidationErrors } from "../utils/handleValidationErrors";
import { httpCreateUser, httpUserAuth, httpUserSignIn } from "../controllers/userController";
import { checkAuth } from "../utils/checkAuth";

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

userRouter.get("/auth", checkAuth, httpUserAuth);