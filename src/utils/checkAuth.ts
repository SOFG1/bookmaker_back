import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";

export const checkAuth: RequestHandler = async (req: AuthRequest, res, next): Promise<any> => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json(["Authorization error"]);
  }
  if (token) {
    try {
      const decoded: any = jwt.verify(token, "secret123");
      req._id = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json(["Authorization error"]);
    }
  }
};