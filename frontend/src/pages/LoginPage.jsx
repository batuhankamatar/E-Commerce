import React from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#252B42]">
            Login to Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-[#737373]">
            Enter your details to continue shopping
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
