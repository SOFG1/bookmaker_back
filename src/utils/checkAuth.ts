import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
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