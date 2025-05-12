import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request?.cookies?.get("token")?.value;
    const refreshToken = request?.cookies?.get("refreshToken")?.value;
    const userData = request?.cookies?.get("userData")?.value;

    if (!token || !refreshToken || !userData) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    return NextResponse.json(
      { success: true, data: {token, refreshToken, userData: JSON.parse(userData)} },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 401 }
    );
  }
}