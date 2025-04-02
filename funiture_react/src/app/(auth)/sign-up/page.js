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
      <h3 className="title">Tôi là người mới</h3>
      <p className="b2 mb--55">Nhập thông tin của bạn bên dưới</p>
      <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
            placeholder="codetify"
          />
          {errors.name && <p className="error">Tên đăng nhập là bắt buộc.</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="codetifytech.io.vn@gmail.com"
          />
          {errors.email && <p className="error">Email là bắt buộc.</p>}
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p className="error">Mật khẩu là bắt buộc.</p>}
        </div>
        <div className="form-group">
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            className="form-control"
            {...register("repassword", { required: true, minLength: 8 })}
          />
          {errors.repassword && <p className="error">Nhập lại mật khẩu là bắt buộc.</p>}
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
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
          {errors.phone && <p className="error">Số điện thoại là bắt buộc.</p>}
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            {...register("address")}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="axil-btn btn-bg-primary submit-btn">
            Đăng ký
          </button>
          {registerError && <p className="success">Tạo tài khoản thành công</p>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
