import { body } from "express-validator";
import { MAX_BET } from "../constants";

export const createBetValidator = [
  body("amount")
    .isNumeric()
    .withMessage("The value must be a number.")
    .custom((value) => value > 0 && value < MAX_BET)
    .withMessage(
      `The bet amount must be greater than 0 and less than ${MAX_BET}.`
    ),
  body("events")
    .isArray({min: 1})
    .withMessage(`The events amount must be greater than 0.`),
];
