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

export const createUser = async (email: string, password: string) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newOne = {
    email,
    passwordHash,
  };
  const res = await Model.create(newOne);
  return res.toObject()
};

export const findUserByEmail = async (email: string) => {
  const res = await Model.findOne({email})
  return res?.toObject()
}


export const findUserById = async (id: string): Promise<any | undefined> => {
  const res = await Model.findById(id)
  return res?.toObject()
}

export const deleteUser = async (id: string) => {
  const res = await Model.findByIdAndDelete(id)
  return res
}