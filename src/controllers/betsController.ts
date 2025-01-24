import { Response } from "express";
import { AuthRequest, EventOddType } from "../types";
import { checkOddChanged } from "../utils/checkOddsChanged";
import { eventsApi } from "../api/events";

export async function httpCreateBet(
  req: AuthRequest,
  res: Response
): Promise<any> {
  try {
    const amount = req.body.amount;
    const events = req.body.events
    let oddsChanged = await checkOddChanged(events)
    if (oddsChanged.length) {
      res.status(202).json({ message: "odds_changed", data: oddsChanged });
      return;
    }
    //Create bet
    res.status(201).json({message: "Bet placed!", data: "bet_placed"});
  } catch (e) {
    console.log(e)
    return res.status(500).json(["Internal server error"]);
  }
}
