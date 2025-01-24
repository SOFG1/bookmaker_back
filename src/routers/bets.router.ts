import { Router } from "express";
import { checkAuth } from "../utils/checkAuth";
import { httpGetBets, httpCreateBet } from "../controllers/betsController";
import { createBetValidator } from "../utils/betsValidatiors";
import { handleValidationErrors } from "../utils/handleValidationErrors";

export const betsRouter = Router();

betsRouter.post(
  "/",
  checkAuth,
  createBetValidator,
  handleValidationErrors,
  httpCreateBet
);

betsRouter.get("/", checkAuth, httpGetBets);
