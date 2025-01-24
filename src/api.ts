import { Router } from "express";
import { userRouter } from "./routers/user.router";
import { eventsRouter } from "./routers/events.router";
import { betsRouter } from "./routers/bets.router";

export const api = Router();


api.use("/user", userRouter)
api.use("/events", eventsRouter)
api.use("/bets", betsRouter)
