'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchUserById } from "@/services/user";
import { setAddress } from "@/store/slices/authSlice";

const UserAddress = () => {
    const [userInfo, setUserInfo] = useState(null);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetchUserById(user.id);
                setUserInfo(response.data);
                dispatch(setAddress(response.data.id));
            } catch (error) {
                console.error("Error fetching user by email:", error);
            }
        };
        fetchUser();
    }
    , [user.id]);
    return ( 
        <div className="axil-dashboard-address">
            <p className="notice-text">Các địa chỉ sau sẽ được sử dụng trên trang thanh toán theo mặc định.</p>
            <div className="row row--30">
                <div className="col-lg-12">
                    <div className="address-info mb--40">
                        <div className="addrss-header d-flex align-items-center justify-content-between">
                            <h4 className="title mb-0">Địa chỉ nhận hàng</h4>
                            <Link href="/dashboard/addresses-edit/shipping" className="address-edit"><i className="far fa-edit" /></Link>
                        </div>
                        <ul className="address-details">
                            <li>Name: {userInfo?.id.name}</li>
                            <li>Email: {userInfo?.id.email}</li>
                            <li>Phone: {userInfo?.id.phone}</li>
                            <li className="mt--30">{userInfo?.id.address}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default UserAddress;