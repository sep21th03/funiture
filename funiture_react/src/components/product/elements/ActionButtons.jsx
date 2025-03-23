"use client";
import Link from "next/link";
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
  useEffect(() => {
    setMounted(true);
  }, []);

  const user_id = useAppSelector((state) => state.auth?.user?.id);
  const quantity = 1;
  const router = useRouter();
  const { product_hex_id, size_id } = props.productAction;
  const formData = {
    user_id,
    product_hex_id,
    size_id,
    quantity,
  };

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance.post(API_ENDPOINT.CART.ADD_CART, formData);

      if (response.data.status === "success") {
        Swal.fire({
          title: "Thành công!",
          text: "Sản phẩm đã được thêm vào giỏ hàng.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          title: "Lỗi!",
          text: "Có lỗi xảy ra khi thêm vào giỏ hàng.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Swal.fire({
        title: "Lỗi!",
        text: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
        icon: "error",
      });
    }
  };

  if (!mounted) return <p>Loading...</p>;

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
