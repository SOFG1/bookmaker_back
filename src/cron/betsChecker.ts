import cron from "node-cron";
import {
  getFinishedBets,
  setBetEventStatus,
  setBetStatus,
} from "../models/bets";
import { eventsApi } from "../api/events";

// cron.schedule("*/30 * * * *", checkFinishedBets);

//Check all finished bets won or not
async function checkFinishedBets() {
  const finishedBets = await getFinishedBets();
  finishedBets.forEach((b) => checkFinishedBet(b));
}

//Check single finished bet
async function checkFinishedBet(bet: any) {
  let betWon = true;
  const { data } = await eventsApi.getScores(bet.events.map((e: any) => e.eventId));
  for (let i = 0; i < bet.events.length; i++) {
    const e = bet.events[i];
    const won = await checkBetEvent(
      e,
      data.find((s: any) => s.id === e.eventId)
    );
    setBetEventStatus(bet._id, e.eventId, won); //Set in DB
    if (!won) betWon = false;
  }
  setBetStatus(bet._id, betWon);
  //Add user balance
}

//Check a single event of a bet
async function checkBetEvent(event: any, score: any) {
  let outcome = "draw";
  const homeScore = score.scores.find((s: any) => s.name === score.home_team);
  const awayScore = score.scores.find((s: any) => s.name === score.away_team);
  if (Number(homeScore) > Number(awayScore)) outcome = "win1";
  if (Number(homeScore) < Number(awayScore)) outcome = "win2";
  return event.place === outcome;
}
