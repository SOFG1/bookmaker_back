import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { api } from "./api";
import morgan from "morgan";
import cors from "cors";
import { runBetsChecker } from "./cron/betsChecker";

//Config
dotenv.config();
const port = 8000;

//Mongo DB
const MONGO_URL = process.env.MONGODB_URL;
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
mongoose.connection.on("error", (e: any) => console.error(e));

//Express APP
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", api);

//Morgan
app.use(morgan("combined"));

//Start server
function startServer() {
  mongoose.connect(MONGO_URL as string);
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    runBetsChecker();
  });
}

startServer();
