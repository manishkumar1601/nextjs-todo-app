import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email } = body;
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "Please enter a valid email" }, { status: 404 });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });
    const link = `${process.env.DOMAIN_URL}/reset-password/${token}`;
    // sendEmail(user.email, "Reset Password", link);
    return NextResponse.json({ success: true, message: "Please check your email to reset your password!! Link will expire in 15 minutes", link }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}