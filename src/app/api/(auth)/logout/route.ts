import { NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: false,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    {
      status: 200,
    }
  );

  response.cookies.set("token", "", {
    ...COOKIE_OPTIONS,
    expires: new Date(0),
  });

  response.cookies.set("refreshToken", "", {
    ...COOKIE_OPTIONS,
    expires: new Date(0),
  });

  response.cookies.set("userData", "", {
    ...COOKIE_OPTIONS,
    expires: new Date(0),
  });

  return response;
}
