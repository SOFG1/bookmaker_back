import { Router } from "express";
import { checkAuth } from "../utils/checkAuth";
import { httpCreateBet } from "../controllers/betsController";

export const betsRouter = Router();

betsRouter.post("/", checkAuth, httpCreateBet)
