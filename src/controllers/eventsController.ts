import { Response } from "express";
import { AuthRequest } from "../types";
import { eventsApi } from "../api/events";

//Get events
export const httpGetEvents = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const { data } = await eventsApi.getEvents();
    data.sort((a: any, b: any) => {
      const f = new Date(a.commence_time).getTime()
      const s = new Date(b.commence_time).getTime()
      console.log(f)
      console.log(s)
      return f - s
    })
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
};
