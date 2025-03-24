"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthLayout from "../layout";
import { login } from "@/services/auth";
import { useAppDispatch } from "@/store/hooks";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data, dispatch, router, setLoginError);
  };
  console.log("loginError", loginError);
  return (
    <AuthLayout bgImage="bg_image--9">
      <div className="axil-signin-form">
        <h3 className="title">Sign in to eTrade.</h3>
        <p className="b2 mb--55">Enter your detail below</p>
        <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="error">Email is required.</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password", { required: true, minLength: 4 })}
            />
            {errors.password && <p className="error">Password is required.</p>}
          </div>
          <div className="form-group d-flex align-items-center justify-content-between">
            <button
              type="submit"
              className="axil-btn btn-bg-primary submit-btn"
            >
              Sign In
            </button>
            <Link href="/forgot-password" className="forgot-btn">
              Forget password?
            </Link>
          </div>
          {loginError && (
            <p className="error">{loginError}</p>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
