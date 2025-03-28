'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {forgotPassword} from '@/services/auth';
import { useRouter } from "next/navigation";


const ForgotPassword = () => {
    const router = useRouter();
    const [forgotEmailError, setForgotEmailError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        setForgotEmailError(null);
        forgotPassword(data, router, setForgotEmailError);
    }
    return ( 
        <div className="axil-signin-form">
        <h3 className="title">Forgot Password?</h3>
        <p className="b2 mb--55">Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
        <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" {...register('email', { required: true, pattern: /^\S+@\S+$/i})} placeholder="annie@example.com" />
                {errors.email && <p className="error">Email is required.</p>}
            </div>
            <div className="form-group">
                <button type="submit" className="axil-btn btn-bg-primary submit-btn">Send Reset Instructions</button>
                {forgotEmailError?.success && <p className="success">{forgotEmailError.success}</p>}
                {forgotEmailError?.error && <p className="error">{forgotEmailError.error}</p>}
            </div>
        </form>
    </div>
    );
}
 
export default ForgotPassword;