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
    const events = req.body.events.map((e: any) => ({...e, odd: Number(e.odd.toFixed(2))}))
    let oddsChanged = await checkOddChanged(events)
    if (oddsChanged) {
      res.status(202).json({ message: "Odds changed please try again", data: "odds_changed" });
      return;
    }
    //Create bet
    res.send(`${req.body.amount} ${req.body.events.length}`);
  } catch (e) {
    console.log(e)
    return res.status(500).json(["Internal server error"]);
  }
}
