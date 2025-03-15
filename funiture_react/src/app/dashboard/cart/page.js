"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_ENDPOINT } from "@/services/apis";
import { toast } from "react-hot-toast";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import OrderDetails from "./order";
import {fetchUserById} from "@/services/user";

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantityUpdates, setQuantityUpdates] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const userId = useAppSelector((state) => state.auth.user.id);
  const router = useRouter();
  const fee_ship = 20000;
  
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINT.CART.GET_CART);
      setCartItems(response.data.data);

      const updates = {};
      response.data.data.forEach((item) => {
        updates[item.id] = item.quantity;
      });
      setQuantityUpdates(updates);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      toast.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (cartId, value) => {
    const newValue = Math.max(1, Math.min(100, value));
    setQuantityUpdates({
      ...quantityUpdates,
      [cartId]: newValue,
    });
  };

  const handleIncrement = (cartId) => {
    if (quantityUpdates[cartId] < 100) {
      handleQuantityChange(cartId, quantityUpdates[cartId] + 1);
    }
  };

  const handleDecrement = (cartId) => {
    if (quantityUpdates[cartId] > 1) {
      handleQuantityChange(cartId, quantityUpdates[cartId] - 1);
    }
  };

  const updateCartItem = async (cart) => {
    const {product_hex_id, size_id, id} = cart;
    const formData = {
      user_id: userId,
      product_hex_id,
      size_id,
      quantity: quantityUpdates[id],
    };
    try {
      setLoading(true);
      const response = await axiosInstance.post(API_ENDPOINT.CART.UPDATE_CART, formData);
      if (response.data.status === "success") {
        toast.success("Cập nhật giỏ hàng thành công");
        fetchCart(); 
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      toast.error("Không thể cập nhật giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (cartId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      return;
    }
    const formData = {
      user_id: userId,
      cart_id: cartId,
    };
    try {
      setLoading(true);
      await axiosInstance.post(
        API_ENDPOINT.CART.DELETE_CART,
        formData
      );
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      fetchCart(); 
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      toast.error("Không thể xóa sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const prepareOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống, không thể đặt hàng");
      return;
    }
    try {
      setLoading(true);
      
      const userResponse = await fetchUserById(userId);
      const user = userResponse.data;
      
      const orderDetails = cartItems.map(item => ({
        id: item.id,
        product_hex_id: item.product_hex_id,
        size_id: item.size_id,
        quantity: quantityUpdates[item.id] || item.quantity,
        price: item.discounted_price,
        product_name: item.product_name,
        image: item.images[0],
        size: item.size,
        total_amount: item.total_amount
      }));
      const completeOrderData = {
        ...user,
        payment_method: paymentMethod === 'cod' ? 1 : 0, 
        shipping_fee: fee_ship,
        total_price: calculateTotal() + fee_ship,
        order_details: orderDetails,
      };
      
      setOrderData(completeOrderData);
      setShowOrderDetails(true);
    } catch (error) {
      console.error("Lỗi khi chuẩn bị đơn hàng:", error);
      toast.error("Không thể chuẩn bị đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.total_amount;
    }, 0);
  };

  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL;

  if (showOrderDetails && orderData) {
    return (
      <OrderDetails 
        orderData={orderData} 
        setOrderData={setOrderData}
        onBack={() => setShowOrderDetails(false)}
        onRefresh={fetchCart}
      />
    );
  }

  return (
    <div className="axil-dashboard-order">
      <h4 className="title mb-4">Giỏ hàng của bạn</h4>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Kích thước</th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Tổng</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="8" className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading && cartItems.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  Giỏ hàng trống
                </td>
              </tr>
            )}

            {!loading &&
              cartItems.length > 0 &&
              cartItems.map((cart) => (
                <tr key={cart.id}>
                  <td>
                    <img
                      src={`${BASE_URL}/${cart.images[0]}`}
                      alt={cart.product_name}
                      className="img-fluid"
                      style={{ maxWidth: "80px", maxHeight: "80px" }}
                    />
                  </td>
                  <td>{cart.product_name}</td>
                  <td>{cart.size}</td>
                  <td>{cart.discounted_price.toLocaleString("vi-VN")} ₫</td>
                  <td>
                    <div className="qty-control d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleDecrement(cart.id)}
                        disabled={quantityUpdates[cart.id] <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="form-control form-control-sm mx-2"
                        style={{
                          width: "60px",
                          padding: 0,
                          textAlign: "center",
                        }}
                        value={quantityUpdates[cart.id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            cart.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                      />
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleIncrement(cart.id)}
                        disabled={quantityUpdates[cart.id] >= 100}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-primary ms-2"
                        onClick={() => updateCartItem(cart)}
                        disabled={cart.quantity === quantityUpdates[cart.id]}
                      >
                       <i className="fa fa-sync"></i>
                      </button>
                    </div>
                  </td>
                  <td>{cart.total_amount.toLocaleString("vi-VN")} ₫</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger w-50"
                      onClick={() => removeCartItem(cart.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!loading && cartItems.length > 0 && (
        <div className="cart-checkout-area mt-5">
          <div className="row">
            <div className="col-lg-5 ms-auto">
              <div className="cart-summary">
                <div className="card">
                  <div className="card-header">
                    <h5>Tổng đơn hàng</h5>
                  </div>
                  <div className="card-body">
                    <div className="summary-totals">
                      <div className="summary-item d-flex justify-content-between mb-3">
                        <span>Tạm tính:</span>
                        <span>
                          {calculateTotal().toLocaleString("vi-VN")} ₫
                        </span>
                      </div>
                      <div className="summary-item d-flex justify-content-between mb-3">
                        <span>Phí vận chuyển:</span>
                        <span>{fee_ship.toLocaleString("vi-VN")} ₫</span>
                      </div>
                      <hr />
                      <div className="summary-item d-flex justify-content-between mb-4">
                        <strong>Tổng cộng:</strong>
                        <strong>
                          {(calculateTotal() + fee_ship).toLocaleString("vi-VN")} ₫
                        </strong>
                      </div>

                      <div className="payment-methods mb-4">
                        <h6 className="mb-3">Phương thức thanh toán</h6>

                        <div className="form-check mb-2">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="payment-cod"
                            name="payment-method"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="payment-cod"
                          >
                            Thanh toán khi nhận hàng (COD)
                          </label>
                        </div>

                        <div className="form-check mb-2">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="payment-bank"
                            name="payment-method"
                            value="bank_transfer"
                            checked={paymentMethod === "bank_transfer"}
                            onChange={() => setPaymentMethod("bank_transfer")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="payment-bank"
                          >
                            QR VNPAY
                          </label>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary w-100"
                        onClick={prepareOrder}
                        disabled={loading}
                      >
                        {loading ? "Đang xử lý..." : "Tiếp tục"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
