import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      gender: data.gender,
      birthDate: data.birthDate,
      type: role.toUpperCase(),
    };

    if (role === "store") {
      payload.storeName = data.storeName;
      payload.taxNo = data.taxNo;
      payload.bankAccount = data.bankAccount;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        payload,
      );

      const { token, name, surname } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log("Kayıt ve Giriş Başarılı:", response.data);
      alert(`Welcome ${name} ${surname}! Your account has been created.`);
      navigate("/profile");
    } catch (error) {
      console.error("Kayıt sırasında hata oluştu:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="w-full max-w-[600px] bg-white p-10 rounded-xl shadow-sm border border-gray-100 font-['Montserrat']">
      <h2 className="text-[#252B42] text-3xl font-bold text-center mb-2">
        Create an Account
      </h2>
      <p className="text-[#737373] text-center mb-8 font-medium">
        Join our community!
      </p>

      <div className="flex mb-10 border-b border-gray-100">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={`flex-1 py-4 font-bold transition-all ${
            role === "customer"
              ? "text-[#23A6F0] border-b-2 border-[#23A6F0]"
              : "text-[#737373]"
          }`}
        >
          Customer
        </button>
        <button
          type="button"
          onClick={() => setRole("store")}
          className={`flex-1 py-4 font-bold transition-all ${
            role === "store"
              ? "text-[#23A6F0] border-b-2 border-[#23A6F0]"
              : "text-[#737373]"
          }`}
        >
          Store
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#252B42] font-bold text-sm text-left">
              First Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: 3,
              })}
              type="text"
              placeholder="First Name"
              className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
            />
            {errors.name && (
              <span className="text-red-500 text-xs text-left">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#252B42] font-bold text-sm text-left">
              Last Name
            </label>
            <input
              {...register("surname", {
                required: "Surname is required",
                minLength: 3,
              })}
              type="text"
              placeholder="Last Name"
              className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
            />
            {errors.surname && (
              <span className="text-red-500 text-xs text-left">
                {errors.surname.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            placeholder="example@mail.com"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.email && (
            <span className="text-red-500 text-xs text-left">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 8,
            })}
            type="password"
            placeholder="Min 8 characters"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.password && (
            <span className="text-red-500 text-xs text-left">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (val, values) =>
                val === values.password || "Passwords do not match",
            })}
            type="password"
            placeholder="Re-enter password"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs text-left">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#252B42] font-bold text-sm text-left">
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-xs text-left">
                {errors.gender.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#252B42] font-bold text-sm text-left">
              Birth Date
            </label>
            <input
              {...register("birthDate", { required: "Birth date is required" })}
              type="date"
              className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
            />
            {errors.birthDate && (
              <span className="text-red-500 text-xs text-left">
                {errors.birthDate.message}
              </span>
            )}
          </div>
        </div>

        {role === "store" && (
          <div className="flex flex-col gap-5 animate-fadeIn">
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm text-left">
                Store Name
              </label>
              <input
                {...register("storeName", {
                  required: "Store name is required",
                })}
                type="text"
                placeholder="Store Name"
                className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md"
              />
              {errors.storeName && (
                <span className="text-red-500 text-xs text-left">
                  {errors.storeName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm text-left">
                Store Tax ID
              </label>
              <input
                {...register("taxNo", { required: "Tax No is required" })}
                type="text"
                placeholder="Tax No"
                className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md"
              />
              {errors.taxNo && (
                <span className="text-red-500 text-xs text-left">
                  {errors.taxNo.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm text-left">
                Store IBAN
              </label>
              <input
                {...register("bankAccount", { required: "IBAN is required" })}
                type="text"
                placeholder="TR..."
                className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md"
              />
              {errors.bankAccount && (
                <span className="text-red-500 text-xs text-left">
                  {errors.bankAccount.message}
                </span>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-[#23A6F0] text-white py-4 rounded-md font-bold text-lg mt-4 shadow-md hover:bg-[#1a8ccf] transition-all active:scale-95"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
