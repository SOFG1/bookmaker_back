import mongoose from "mongoose";

const betSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    amount: {
      type: Number,
      required: true,
    },
    odd: {
      type: Number,
      required: true,
    },
    win: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "active"
    },
    finishDate: {
      type: String,
      required: true,
    },
    events: {
      type: [
        {
          eventId: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          date: {
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
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("bet", betSchema);

export const createBet = async (
  user: string,
  amount: number,
  events: any[]
) => {
  const totalOdd = events.reduce((ac, c) => {
    return ac * c.event.odd;
  }, 1);
  const win = Number((amount * totalOdd).toFixed(2));
  const evsFormated = events.map(e => e.event)
  const finishDates = events.map(e => new Date(e.event.date).getTime() + (3.5 * 60 * 60 * 1000))
  const finishDate = new Date(Math.max(...finishDates)).toISOString()
  const newOne = {
    user,
    odd: Number(totalOdd.toFixed(2)),
    win,
    amount,
    events: evsFormated,
    finishDate,
  };
  const res = await Model.create(newOne);
  return res.toObject();
};

export const getBets = async (userId: string) => {
  const res = await Model.find({ user: userId }).sort({ createdAt: -1 });
  return res.map((b) => b.toObject());
};

export const deleteUserBets = async (userId: string) => {
  const res = await Model.deleteMany({ user: userId });
  return res.acknowledged;
};
