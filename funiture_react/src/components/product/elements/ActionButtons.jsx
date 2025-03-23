"use client";
import { useAppSelector } from "@/store/hooks";
import axiosInstance from "../../../utils/axiosInstance";
import { API_ENDPOINT } from "@/services/apis";
import Swal from "sweetalert2";

const ActionButtons = (props) => {
  const user_id = useAppSelector((state) => state.auth?.user?.id);
  const quantity = 1;
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
          text: "Không thể thêm sản phẩm vào giỏ hàng.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Swal.fire({
        title: "Lỗi!",
        text: "Đã xảy ra lỗi, vui lòng thử lại sau.",
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