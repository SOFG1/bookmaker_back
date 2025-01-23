import { Request } from "express";

export interface AuthRequest extends Request {
  _id?: string;
}

export interface IUser {
  _id: string;
  email: string;
  balance: number;
  token: string;
}
