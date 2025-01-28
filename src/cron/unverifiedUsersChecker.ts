import cron from "node-cron";
import {deleteUnverifiedUsers} from "../models/user"

export const runUnverifiedUsersChecker = () => {
  cron.schedule("*/10 * * * *", deleteUnverifiedUsers);
  deleteUnverifiedUsers();
};