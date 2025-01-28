import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    verification: {
      type: String, // 4-digit code or 'verified' string
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("user", userSchema);

export const createUser = async (
  email: string,
  password: string,
  verificationCode: string
) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newOne = {
    email,
    verification: verificationCode,
    passwordHash,
  };
  const res = await Model.create(newOne);
  return res.toObject();
};

export const findUserByEmail = async (email: string) => {
  const res = await Model.findOne({ email });
  return res?.toObject();
};

export const findUserById = async (id: string): Promise<any | undefined> => {
  const res = await Model.findById(id);
  return res?.toObject();
};

export const deleteUser = async (id: string) => {
  const res = await Model.findByIdAndDelete(id);
  return res;
};

export const changeBalance = async (
  id: string,
  type: "+" | "-",
  amount: number
) => {
  let val;
  try {
    const user = await Model.findById(id);
    if (user) {
      if (type === "+") user.balance += amount;
      if (type === "-") user.balance -= amount;
      const updated = await user.save();
      val = updated.toObject();
    } else {
      val = "error";
    }
  } catch (error) {
    val = "error";
  }
  return val;
};

export const verifyUser = async (id: string, code: string) => {
  const user = await Model.findById(id);
  console.log(user?.verification);
  if (user?.verification === "verified") {
    throw new Error("User already verified");
  }
  if (user?.verification === code) {
    user.verification = "verified";
    user.save();
    return user.toObject();
  }
  throw new Error("Code is incorrect");
};
