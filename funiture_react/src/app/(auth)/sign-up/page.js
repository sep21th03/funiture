"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser  } from "@/services/auth";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerError, setRegisterError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser (data, dispatch, router, setRegisterError);
  };

  return (
    <div className="axil-signin-form">
      <h3 className="title">I&apos;m New Here</h3>
      <p className="b2 mb--55">Enter your detail below</p>
      <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
            placeholder="admin"
          />
          {errors.name && <p className="error">User Name is required.</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="annie@example.com"
          />
          {errors.email && <p className="error">Email is required.</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p className="error">Password is required.</p>}
        </div>
        <div className="form-group">
          <label>Re password</label>
          <input
            type="password"
            className="form-control"
            {...register("repassword", { required: true, minLength: 8 })}
          />
          {errors.repassword && <p className="error">Password is required.</p>}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "Số điện thoại phải có 10 hoặc 11 chữ số",
              },
            })}
          />

          {errors.phone && <p className="error">Password is required.</p>}
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            {...register("address")}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="axil-btn btn-bg-primary submit-btn">
            Create Account
          </button>
          {registerError && <p className="success">Account Created successfully</p>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
