import { Router } from "express";
import { checkAuth } from "../utils/checkAuth";
import { httpGetEvents } from "../controllers/eventsController";

export const eventsRouter = Router();


//Auth
eventsRouter.get("/", checkAuth, httpGetEvents);