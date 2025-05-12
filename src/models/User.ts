import mongoose from "mongoose";

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  {
    timestamps: true,
    bufferCommands: false,
    autoCreate: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);