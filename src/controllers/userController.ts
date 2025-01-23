import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, deleteUser, findUserByEmail, findUserById } from "../models/user";
import { formatUserData } from "../utils/formatUserData";
import { AuthRequest } from "../types";

//Sign up
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
    const user = await findUserByEmail(req.body.email);
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


//Check Auth
export async function httpUserAuth(req: AuthRequest, res: Response): Promise<any> {
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
export async function httpDeleteAccount(req: AuthRequest, res: Response): Promise<any> {
  try {
    const id = req._id
    const password = req.body.password
    const user = await findUserById(id!)
    if (!user) {
      return res.status(401).json(["User not found"]);
    }
    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      return res.status(401).json(["Invalid password"]);
    }
    const resp = await deleteUser(id!)
    if(resp) {
      return res.status(200).json({message: "Successfully deleted"})
    }
  } catch(e) {
    return res.status(500).json(["Internal server error"]);
  }
}