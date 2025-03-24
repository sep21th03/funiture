"use client";
import { useAppSelector } from "@/store/hooks";
import {
  addToCart,
  addToWishlist,
  removeWishlistItem,
  addToQuickView,
} from "@/store/slices/productSlice";
import axiosInstance from "../../../utils/axiosInstance";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_ENDPOINT } from "@/services/apis";

const ActionButtons = (props) => {
  const [mounted, setMounted] = useState(false);
  const user_id = useAppSelector((state) => state.auth?.user?.id);
  const router = useRouter();
  const { product_hex_id, size_id } = props.productAction;
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = async () => {
    if (!user_id) {
      return Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng đăng nhập để đặt hàng.",
        icon: "error",
      });
    }

    try {
      const response = await axiosInstance.post(API_ENDPOINT.CART.ADD_CART, {
        user_id,
        product_hex_id: product_hex_id,
        size_id: size_id,
        quantity: 1,
      });

      Swal.fire({
        title: response.data.status === "success" ? "Thành công!" : "Lỗi!",
        text: response.data.status === "success"
          ? "Sản phẩm đã được thêm vào giỏ hàng."
          : "Có lỗi xảy ra khi thêm vào giỏ hàng.",
        icon: response.data.status === "success" ? "success" : "error",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Swal.fire({
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.",
        icon: "error",
      });
    }
  };

  return (
    <ul className="cart-action">
      <li className="select-option">
        <button onClick={() => handleAddToCart(props.productAction)}>
          Add to Cart
        </button>
      </li>
    </ul>
  );
};

export default ActionButtons;
