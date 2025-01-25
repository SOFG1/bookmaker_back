import mongoose from "mongoose";
import { TicketEvent } from "../types";

const betSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    amount: {
      type: Number,
      required: true,
    },
    events: {
      type: [
        {
          eventId: {
            type: String,
            required: true,
          },
          place: {
            type: String,
            required: true,
          },
          odd: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    finishDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("bet", betSchema);


export const createBet = async (
  user: string,
  amount: number,
  events: TicketEvent[],
  finishDate: string
) => {
  const newOne = {
    user,
    amount,
    events,
    finishDate,
  };
  const res = await Model.create(newOne);
  return res.toObject();
};


export const getBets = async (userId: string) => {
  const res = await Model.find({user: userId})
  return res.map(b => b.toObject())
}


export const deleteUserBets = async (userId: string) => {
  const res = await Model.deleteMany({user: userId})
  return res.acknowledged
}