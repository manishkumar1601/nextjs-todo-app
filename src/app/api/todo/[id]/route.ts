import { connectDB } from "@/lib/db";
import { Todo } from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const todo = await Todo.findByIdAndUpdate(id, {
      isCompleted: body.isCompleted,
    }, { new: true });
    const formattedTodo = {
      id: todo?._id.toString(),
      content: todo?.content,
      isCompleted: todo?.isCompleted,
      userId: todo?.userId.toString()
    }
    return NextResponse.json({ success: true, data: formattedTodo }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connectDB();
    const { id } = await params;
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Todo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log('eroor', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}