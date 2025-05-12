import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ success: true, data: decoded });
  } catch (error) {
    console.log('error', error);
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
