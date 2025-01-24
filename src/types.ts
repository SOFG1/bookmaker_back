import { Request } from "express";

export interface AuthRequest extends Request {
  _id?: string;
}

export type EventOddType = "win1" | "win2" | "draw";

export type TicketEvent = {
  eventId: string;
  place: EventOddType;
  odd: number;
};
