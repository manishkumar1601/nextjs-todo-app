import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const todoSchema = yup.object({
  content: yup.string().required("Content is required"),
  isCompleted: yup.boolean().default(false),
  userId: yup.string().required("User ID is required"),
});

export const GET = async (request: NextRequest) => {
  try {
    const userId = request?.nextUrl?.searchParams.get('userId');
    await connectDB();

    if (!userId) {
      const todosAll = await Todo.find();
      const formattedTodos = todosAll.reduce((acc, todo) => {
        const todoNew = {
          id: todo?._id.toString(),
          content: todo?.content,
          isCompleted: todo?.isCompleted,
          userId: todo?.userId.toString()
        }
        acc.push(todoNew);
        return acc;
      }, []);
      return NextResponse.json({ success: true, data: formattedTodos }, { status: 200 });
    }

    const todos = (await Todo.find({ userId }));
    const formattedTodos = todos.reduce((acc, todo) => {
      const todoNew = {
        id: todo?._id.toString(),
        content: todo?.content,
        isCompleted: todo?.isCompleted,
        userId: todo?.userId.toString()
      }
      acc.push(todoNew);
      return acc;
    }, []);
    return NextResponse.json({ success: true, data: formattedTodos }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const parsedBody = await todoSchema.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    });
    await connectDB();

    if (!Types.ObjectId.isValid(parsedBody?.userId)) {
      throw new Error("Invalid userId format");
    }
    const userId = new Types.ObjectId(parsedBody?.userId);
    const todo = await new Todo({
      content: parsedBody.content,
      isCompleted: parsedBody.isCompleted,
      userId: userId,
    }).save();
    return NextResponse.json({ success: true, data: todo }, { status: 201 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    await connectDB();
    await Todo.deleteMany();
    return NextResponse.json({ success: true, message: "Todos deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};