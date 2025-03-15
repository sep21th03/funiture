'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from "@/utils/axiosInstance"; // Import Axios instance
import { API_ENDPOINT } from "@/services/apis";
import { useAppSelector } from '@/store/hooks';

const AccountDetails = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const user = useAppSelector((state) => state.auth.user);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage(null);

        try {
            const response = await axiosInstance.post(API_ENDPOINT.USER.CHANGE_PASSWORD, {
                email: user.email,
                current_password: data.currentPassword,
                new_password: data.newPassword,
                new_password_confirmation: data.confirmPassword,
            });

            if(response.data) {
                setMessage({ type: "success", text: "Đổi mật khẩu thành công!" });
                reset();
            }
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Có lỗi xảy ra!" });
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="axil-dashboard-account">
            <form className="account-details-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-12">
                        <h5 className="title">Đổi mật khẩu</h5>

                        {message && (
                            <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="form-group">
                            <label>Mật khẩu cũ</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                {...register("currentPassword", { required: "Vui lòng nhập mật khẩu cũ!" })} 
                            />
                            {errors.currentPassword && <p className="error">{errors.currentPassword.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Mật khẩu mới</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                {...register("newPassword", { 
                                    required: "Vui lòng nhập mật khẩu mới!",
                                    minLength: { value: 6, message: "Mật khẩu phải ít nhất 6 ký tự!" }
                                })} 
                            />
                            {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Nhập lại mật khẩu</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                {...register("confirmPassword", { 
                                    required: "Vui lòng nhập lại mật khẩu!",
                                    validate: (value) => value === watch("newPassword") || "Mật khẩu không khớp!"
                                })} 
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="form-group mb--0">
                            <button type="submit" className="axil-btn" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Lưu thay đổi"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default AccountDetails;
