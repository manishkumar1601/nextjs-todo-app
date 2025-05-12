import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

interface ResetPasswordPageProps {
  params: { token: string };
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  const { token } = await params;
  return <ResetPasswordHandler token={token} />;
}

const ResetPasswordHandler = async ({ token }: { token: string }) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (decoded) {
      return <ResetPasswordForm token={token} id={decoded?.id} />;
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
  }
  return redirect("/login");
};

export default ResetPasswordPage;