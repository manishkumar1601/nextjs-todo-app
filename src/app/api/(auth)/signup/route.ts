import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";

const signupSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export async function POST(request: NextRequest) {
  try {
		await connectDB();
    const body = await request.json();
    const parsedBody = await signupSchema.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    });
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(parsedBody?.password, salt);

		await new User({
			firstName: parsedBody.firstName,
			lastName: parsedBody.lastName,
			userName: parsedBody.userName,
			email: parsedBody.email,
			password: hashedPassword,
		}).save();

		return NextResponse.json(
			{
				success: true,
				message: "Account created successfully",
			},
			{ status: 201 }
		);
  } catch (error) {
		console.log(error);
		let validationError;
		if (error instanceof yup.ValidationError) {
			validationError = error?.inner?.map(err => ({
				field: err.path,
				type: err.type,
				errorMessage: err.message
			}));
		}
		return NextResponse.json(
			{
				success: false,
				error: validationError ? validationError : error,
			},
			{
				status: 400,
			}
		);
  }
}
