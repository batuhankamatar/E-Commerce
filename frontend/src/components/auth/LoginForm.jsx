// LoginForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../store/reducers/clientReducer";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { rememberMe, ...credentials } = data;

    try {
      const user = await dispatch(loginUser(credentials, rememberMe));

      toast.success(`Welcome back, ${user.name}!`);
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-[#252B42] mb-1 block">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-bold text-[#252B42] mb-1 block">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[#23A6F0] focus:border-[#23A6F0] sm:text-sm"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            {...register("rememberMe")}
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 block text-sm text-[#737373] cursor-pointer"
          >
            Remember Me
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#23A6F0] hover:bg-[#1a7bb3] transition-all ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
