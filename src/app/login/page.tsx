import LoginForm from "@/components/LoginForm"

const LoginPage = () => {
  return (
    <div className="sm:max-w-[500px] mx-auto py-12 bg-gray-100 rounded-md sm:my-12 flex-1 h-full">
      <h1 className="font-semibold text-3xl text-center">Login</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage;