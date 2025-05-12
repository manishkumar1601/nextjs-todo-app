import mongoose from "mongoose";

const TodoSchema: mongoose.Schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  {
    timestamps: true,
    bufferCommands: false,
    autoCreate: true,
  }
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);