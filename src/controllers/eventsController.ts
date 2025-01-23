import { Response } from "express";
import { AuthRequest } from "../types";
import { eventsApi } from "../api/events";

export const httpGetEvents = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const { data } = await eventsApi.getEvents();
    console.log(data)
    return res.status(200).json(data);
  } catch (e) {
    console.log(e)
    return res.status(500).json(["Internal server error"]);
  }
};
