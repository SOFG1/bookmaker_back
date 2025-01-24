import { RequestHandler, Router } from "express";
import { createUserValidator } from "../utils/userValidators";
import { handleValidationErrors } from "../utils/handleValidationErrors";
import {
  httpCreateUser,
  httpDeleteAccount,
  httpTopupBalance,
  httpUserAuth,
  httpUserSignIn,
} from "../controllers/userController";
import { checkAuth } from "../utils/checkAuth";

export const userRouter = Router();

//Sign up
userRouter.post(
  "/sign-up/",
  createUserValidator,
  handleValidationErrors,
  httpCreateUser
);

//Sign in
userRouter.post(
  "/sign-in/",
  createUserValidator,
  handleValidationErrors,
  httpUserSignIn
);

//Auth
userRouter.get("/auth", checkAuth, httpUserAuth);

//Delete account
userRouter.delete("/delete", checkAuth, httpDeleteAccount);

userRouter.post("/topup", checkAuth, httpTopupBalance)