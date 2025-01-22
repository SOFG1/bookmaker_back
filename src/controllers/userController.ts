import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUser } from "../models/user";
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

//Sign in
export async function httpUserSignIn(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const user = await findUser(req.body.email);
    if (!user) {
      return res.status(401).json(["Invalid user's credentials"]);
    }
    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!isValidPass) {
      return res.status(401).json(["Invalid user's credentials"]);
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({ user: formatUserData(user), token });
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}
