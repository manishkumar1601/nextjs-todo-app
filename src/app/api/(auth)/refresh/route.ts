import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get("refreshToken")?.value;
  const userData = (await cookieStore).get("userData")?.value;

  console.log('refreshToken', (await cookieStore).get("refreshToken")?.value);
  console.log('userData', (await cookieStore).get("userData")?.value);

  if (!refreshToken || !userData) {
    return NextResponse.json(
      { success: false, message: "Refresh token or user data missing" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as any;

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const newAccessToken = jwt.sign(
      JSON.parse(userData ?? ""),
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    const response = NextResponse.json({
      success: true,
      token: newAccessToken,
    });
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
