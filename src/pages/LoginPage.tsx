import { LoginForm } from "@/components/authentication/LoginForm";
import { NavLink } from "react-router";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo */}
          <div className="text-2xl font-bold text-primary">
            <NavLink to={"/"} className={"text-decoration-none flex items-center"}>
            <img src="/Logo.png" alt="Logo" className="h-8 ml-2" />
            <h2 className="">SafePay</h2>
            </NavLink>
          </div>

{/* left content here */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>

        {/* right content here */}
      </div>
    </div>
  )
}
