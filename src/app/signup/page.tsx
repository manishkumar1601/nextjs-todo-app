import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="sm:max-w-[500px] mx-auto py-12 bg-gray-100 rounded-md sm:my-12">
      <h1 className="font-semibold text-3xl text-center">Create new account</h1>
      <SignupForm />
    </div>
  );
}

export default SignupPage;