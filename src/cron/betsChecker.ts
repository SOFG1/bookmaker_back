import cron from "node-cron";
import { getFinishedBets } from "../models/bets";

cron.schedule("*/5 * * * * *", checkFinishedBets);


async function checkFinishedBets() {
    const finishedBets = await getFinishedBets()
    console.log(finishedBets.length)
}