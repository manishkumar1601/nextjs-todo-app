import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { token, password, id } = body;
    if (!token || !password || !id) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    return NextResponse.json({ success: true, message: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}