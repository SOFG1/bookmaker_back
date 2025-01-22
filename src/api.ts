import { Router } from "express";
import { userRouter } from "./routers/user.router";

export const api = Router();


api.use("/user", userRouter)

api.get("/", (req, res) => {
  res.send("Api");
});
