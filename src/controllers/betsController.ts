import { Response } from "express";
import { AuthRequest } from "../types";
import { checkOddChanged } from "../utils/checkOddsChanged";
import { changeBalance, findUserById } from "../models/user";
import { createBet, getBets } from "../models/bets";

function formatBets(bets: any[]) {
    return bets.map(b => {
        const copy = {...b}
        delete copy.__v
        delete copy.updatedAt
        return copy
    })
}

export async function httpCreateBet(
  req: AuthRequest,
  res: Response
): Promise<any> {
  try {
    //Check odds changed or not
    const events = req.body.events;
    let oddsChanged = await checkOddChanged(events);
    if (oddsChanged.length) {
      return res
        .status(202)
        .json({ message: "odds_changed", data: oddsChanged });
    }
    //Create bet
    const amount = req.body.amount;
    const user = await findUserById(req._id!);
    //Insuficient balance
    if (user.balance < amount) {
      return res.status(400).json(["Insuficient balance"]);
    }
    const updatedUser = await changeBalance(req._id!, "-", amount);
    if (updatedUser === "error") {
      return res.status(400).json(["Insuficient balance"]);
    }
    const bet = await createBet(user._id, amount, events, "test");
    res.status(201).json({ message: "success", data: {bet, user: updatedUser} });
  } catch (e) {
    console.log(e);
    return res.status(500).json(["Internal server error"]);
  }
}


export async function httpGetBets(req: AuthRequest, res: Response): Promise<any> {
    const resp = await getBets(req._id!)
    return res.status(200).json({data: formatBets(resp)})
}
