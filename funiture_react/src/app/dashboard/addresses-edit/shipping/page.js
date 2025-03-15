'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAddress } from "@/store/slices/authSlice"; 
import axiosInstance from "@/utils/axiosInstance";
import { API_ENDPOINT } from "@/services/apis";

const ShippingAddress = () => {
    const address = useAppSelector((state) => state.auth.address); 
    const dispatch = useAppDispatch(); 
    const [userShippingInfo, setUserShippingInfo] = useState(address || {});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); 

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: userShippingInfo,
    });

    useEffect(() => {
        if (address) {
            setUserShippingInfo(address);
            reset(address);
        }
    }, [address, reset]);

    const userShippingInfoHandler = async (data) => {
        setLoading(true);
        setMessage(null);

        const updatedData = {
            id: address?.id,
            name: data.firstName,
            phone: data.phone,
            address: data.address1,
        };

        try {
            const response = await axiosInstance.post(API_ENDPOINT.USER.UPDATE_ADDRESS, updatedData);
            
            dispatch(setAddress(updatedData));

            setMessage({ type: "success", text: "Cập nhật địa chỉ thành công!" });
        } catch (error) {
            console.error("Error updating address:", error);
            setMessage({ type: "error", text: "Có lỗi xảy ra, vui lòng thử lại!" });
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <>
            <h4 className="title">Địa chỉ nhận hàng</h4>
            
            {message && (
                <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
                    {message.text}
                </div>
            )}

            <form className="account-details-form" onSubmit={handleSubmit(userShippingInfoHandler)}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" {...register('firstName', { required: true })} defaultValue={userShippingInfo?.name || ""} />
                            {errors.firstName && <p className="error">Name is required.</p>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" className="form-control" {...register('phone', { required: true })} defaultValue={userShippingInfo?.phone || ""} />
                            {errors.phone && <p className="error">Phone Number is required.</p>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" {...register('address1', { required: true })} defaultValue={userShippingInfo?.address || ""} />
                            {errors.address1 && <p className="error">Address is required.</p>}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group mb--0">
                            <button type="submit" className="axil-btn" disabled={loading}>
                                {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ShippingAddress;
