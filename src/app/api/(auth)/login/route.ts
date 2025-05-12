import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";
import { User } from "@/models/User";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
};

function generateTokens(userData: object) {
  const token = jwt.sign(userData, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(
    userData,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
  return { token, refreshToken };
}

function setAuthCookies(
  response: NextResponse,
  token: string,
  refreshToken: string,
  userData: object
) {
  response.cookies.set("token", token, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60, // 1 hour
  });

  response.cookies.set("refreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  response.cookies.set("userData", JSON.stringify(userData), {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = await loginSchema.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    });

    await connectDB();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const userData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const { token, refreshToken } = generateTokens(userData);

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully",
        data: { token, refreshToken, userData },
      },
      { status: 200 }
    );

    setAuthCookies(response, token, refreshToken, userData);
    return response;
  } catch (error) {
    console.error(error);

    if (error instanceof yup.ValidationError) {
      const validationError = error.inner.map((err) => ({
        field: err.path,
        type: err.type,
        errorMessage: err.message,
      }));

      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
