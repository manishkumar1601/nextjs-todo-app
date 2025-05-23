import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>;
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  try {
    const { token } = await params;
    const decoded: any = jwt.verify(token, process?.env?.JWT_SECRET as string);
    if (decoded) {
      return <ResetPasswordForm token={token} id={decoded?.id} />;
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return redirect("/login");
  }
}

export default ResetPasswordPage;