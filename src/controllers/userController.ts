import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser } from "../models/user";
import { formatUserData } from "../utils/formatUserData";

export async function httpCreateUser(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await createUser(email, password);

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    res.send({ user: formatUserData(user), token });
  } catch (e) {
    return res
      .status(500)
      .json(["Error occured, maybe a user with this email already exists"]);
  }
}
