import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const SignupForm = () => {
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { role_id: "", gender: "", birthDate: "" },
  });

  const selectedRoleId = watch("role_id");
  const selectedRole = roles.find(
    (r) => String(r.id) === String(selectedRoleId),
  );

  const isStore =
    selectedRole?.authority === "ROLE_STORE" ||
    selectedRole?.name?.toLowerCase().includes("store");

  // Rol isimlerini güzelleştiren yardımcı fonksiyon
  const formatRoleName = (role) => {
    const rawName = role.authority || role.name || "";
    // ROLE_ kısmını at, hepsini küçült, sadece ilk harfi büyüt
    return rawName
      .replace("ROLE_", "")
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    axiosInstance
      .get("/roles")
      .then((res) => {
        setRoles(res.data);
        const customerRole = res.data.find(
          (r) =>
            r.authority === "ROLE_CUSTOMER" ||
            r.name?.toLowerCase().includes("customer"),
        );
        if (customerRole) {
          setValue("role_id", String(customerRole.id));
        }
      })
      .catch((err) =>
        console.error("Kendi backendinden roller çekilemedi:", err),
      );
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const payload = {
      name: data.name.trim(),
      surname: data.surname.trim(),
      email: data.email,
      password: data.password,
      roleId: Number(data.role_id),
      gender: data.gender,
      birthDate: data.birthDate,
    };

    if (isStore) {
      payload.store = {
        storeName: data.storeName,
        phone: data.storePhone,
        taxNo: data.taxNo,
        bankAccount: data.bankAccount,
      };
    }

    try {
      await axiosInstance.post("/auth/register", payload);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            type="text"
            placeholder="Your Name"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Surname
          </label>
          <input
            {...register("surname", {
              required: "Surname is required",
              minLength: {
                value: 3,
                message: "Surname must be at least 3 characters",
              },
            })}
            type="text"
            placeholder="Your Surname"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.surname && (
            <span className="text-red-500 text-xs">
              {errors.surname.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="example@mail.com"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                message:
                  "Must include uppercase, lowercase, number and special character",
              },
            })}
            type="password"
            placeholder="Min 8 chars, upper/lower/number/special"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
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
              required: "Please confirm your password",
              validate: (val) =>
                val === watch("password") || "Passwords do not match",
            })}
            type="password"
            placeholder="Re-enter password"
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Gender
          </label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-xs">
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
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0] text-[#737373]"
          />
          {errors.birthDate && (
            <span className="text-red-500 text-xs">
              {errors.birthDate.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#252B42] font-bold text-sm text-left">
            Role
          </label>
          <select
            {...register("role_id", { required: "Please select a role" })}
            className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {formatRoleName(role)}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <span className="text-red-500 text-xs">
              {errors.role_id.message}
            </span>
          )}
        </div>

        {isStore && (
          <div className="flex flex-col gap-5 border-t border-gray-100 pt-5">
            <h3 className="font-bold text-[#252B42]">Store Information</h3>

            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm text-left">
                Store Name
              </label>
              <input
                {...register("storeName", {
                  required: "Store name is required",
                  minLength: {
                    value: 3,
                    message: "Store name must be at least 3 characters",
                  },
                })}
                type="text"
                placeholder="Store Name"
                className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
              />
              {errors.storeName && (
                <span className="text-red-500 text-xs">
                  {errors.storeName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm text-left">
                Store Phone
              </label>
              <input
                {...register("storePhone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^(\+90|0)?[0-9]{10}$/,
                    message: "Please enter a valid Turkish phone number",
                  },
                })}
                type="tel"
                placeholder="+90 5XX XXX XX XX"
                className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
              />
              {errors.storePhone && (
                <span className="text-red-500 text-xs">
                  {errors.storePhone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm text-left">
                Tax ID
              </label>
              <input
                {...register("taxNo", {
                  required: "Tax ID is required",
                  pattern: {
                    value: /^T\d{4}V\d{6}$/,
                    message: "Tax ID must match pattern TXXXXVXXXXXX",
                  },
                })}
                type="text"
                placeholder="TXXXXVXXXXXX"
                className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
              />
              {errors.taxNo && (
                <span className="text-red-500 text-xs">
                  {errors.taxNo.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#252B42] font-bold text-sm text-left">
                Bank Account (IBAN)
              </label>
              <input
                {...register("bankAccount", {
                  required: "IBAN is required",
                  pattern: {
                    value: /^TR\d{24}$/,
                    message:
                      "Please enter a valid Turkish IBAN (TR + 24 digits)",
                  },
                })}
                type="text"
                placeholder="TR000000000000000000000000"
                className="p-4 bg-[#F9F9F9] border border-[#E6E6E6] rounded-md focus:outline-[#23A6F0]"
              />
              {errors.bankAccount && (
                <span className="text-red-500 text-xs">
                  {errors.bankAccount.message}
                </span>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#23A6F0] text-white py-4 rounded-md font-bold text-lg mt-4 shadow-md hover:bg-[#1a8ccf] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
