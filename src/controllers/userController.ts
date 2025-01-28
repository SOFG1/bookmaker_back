import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  changeBalance,
  verifyUser,
} from "../models/user";
import { formatUserData } from "../utils/formatUserData";
import { AuthRequest } from "../types";
import { deleteUserBets } from "../models/bets";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { emailsApi } from "../api/emails";

//Sign up
export async function httpCreateUser(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const verificationCode = generateVerificationCode();
    emailsApi.sendEmail(email, verificationCode)
    const user = await createUser(email, password, verificationCode);
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
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json(["Invalid user's credentials"]);
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
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

//Check Auth
export async function httpUserAuth(
  req: AuthRequest,
  res: Response
): Promise<any> {
  try {
    const user = await findUserById(req._id!);
    if (user) {
      const token = req.headers.authorization;
      return res.json(formatUserData({ user, token }));
    }
    return res.status(404).json(["User not found"]);
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

//Delete account
export async function httpDeleteAccount(
  req: AuthRequest,
  res: Response
): Promise<any> {
  try {
    const id = req._id;
    const password = req.body.password;
    const user = await findUserById(id!);
    if (!user) {
      return res.status(401).json(["User not found"]);
    }
    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      return res.status(401).json(["Invalid password"]);
    }
    await deleteUserBets(id!);
    const resp = await deleteUser(id!);
    if (resp) {
      return res.status(200).json({ message: "Successfully deleted" });
    }
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}

//Top up balance
export async function httpTopupBalance(
  req: AuthRequest,
  res: Response
): Promise<any> {
  try {
    const id = req._id;
    const user = await changeBalance(id!, "+", 1000);
    if (user) {
      res.status(200).json(formatUserData(user));
    }
    if (!user) {
      res.status(500).json(["Unable to improve balance"]);
    }
  } catch (e) {
    return res.status(500).json(["Internal server error"]);
  }
}


//Verify email
export async function httpUserVerify(
  req: AuthRequest,
  res: Response
): Promise<any> {
  try {
    const code = req.body.code
    const user = await verifyUser(req._id!, code);
    console.log(user)
    res.status(200).json(formatUserData(user))
  } catch (e: any) {
    const message = typeof e?.message === "string" ? e.message : "Internal server error"
    return res.status(500).json([message]);
  }
}