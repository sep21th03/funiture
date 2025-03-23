"use client";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_ENDPOINT } from "@/services/apis";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const OrderDetails = ({ 
  orderData, 
  setOrderData, 
  onBack, 
  onRefresh 
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL;

  const handleInputChange = (field, value) => {
    setOrderData({
        ...orderData,
        id: {
            ...orderData.id,
            [field]: value
        }
    });
  };

  const placeOrder = async () => {
    if (!orderData.id.name || !orderData.id.phone || !orderData.id.address) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(API_ENDPOINT.ORDER.CREATE_ORDER, orderData);
      console.log("Full response:", response);

      let responseData = response.data;

      if (typeof responseData === "string") {
        const jsonMatch = responseData.match(/{.*}/);
        if (jsonMatch) {
          responseData = JSON.parse(jsonMatch[0]);
        }
      }
      console.log("Response data:", responseData);

      if (responseData.status.trim().toLowerCase() === "success") {
        const orderDetails = responseData.data;
        console.log("Order details:", orderDetails);

        if (orderData.payment_method === 1) {
          router.push(`/dashboard/cart/order-success/${orderDetails.code}`);
        } else {
          const paymentResponse = await axiosInstance.post(API_ENDPOINT.ORDER.VNPAY, {
            order_id: orderDetails.code,
            amount: orderDetails.total_price,
            url_return: `${window.location.origin}/dashboard/cart/payment-result/${orderDetails.code}`
          });
          
          if (paymentResponse.data.code === '00') {
            window.location.href = paymentResponse.data.data;
          } else {
            toast.error("Lỗi khởi tạo thanh toán VNPAY");
          }
        }
      } else {
        toast.error(responseData.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error(error.response?.data?.message || "Không thể hoàn tất đặt hàng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="axil-order-details">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="title w-50">Thông tin đơn hàng</h4>
        <button 
          className="btn btn-outline-secondary" 
          onClick={onBack}
          disabled={loading}
          style={{height: "40px"}}
        >
          <i className="fas fa-arrow-left me-2"></i> Quay lại giỏ hàng
        </button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Thông tin nhận hàng</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Tên <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={orderData.id.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                    required 
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Điện thoại <span className="text-danger">*</span></label>
                <input 
                  type="tel" 
                  className="form-control" 
                  value={orderData.id.phone} 
                  onChange={(e) => handleInputChange('phone', e.target.value)} 
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Địa chỉ <span className="text-danger">*</span></label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  value={orderData.id.address} 
                  onChange={(e) => handleInputChange('address', e.target.value)} 
                  required 
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Ghi chú</label>
                <textarea 
                  className="form-control" 
                  rows="2" 
                  value={orderData.note} 
                  onChange={(e) => handleInputChange('note', e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5>Chi tiết sản phẩm</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table m-0">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Kích thước</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.order_details.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={`${BASE_URL}/${item.image}`} 
                              alt={item.product_name} 
                              className="img-fluid me-2" 
                              style={{maxWidth: "50px", maxHeight: "50px"}} 
                            />
                            <span>{item.product_name}</span>
                          </div>
                        </td>
                        <td>{item.size}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toLocaleString("vi-VN")} ₫</td>
                        <td>{item.total_amount.toLocaleString("vi-VN")} ₫</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5>Tổng đơn hàng</h5>
            </div>
            <div className="card-body">
              <div className="summary-item d-flex justify-content-between mb-3">
                <span>Tạm tính:</span>
                <span>
                  {(orderData.total_price - orderData.shipping_fee).toLocaleString("vi-VN")} ₫
                </span>
              </div>
              <div className="summary-item d-flex justify-content-between mb-3">
                <span>Phí vận chuyển:</span>
                <span>{orderData.shipping_fee.toLocaleString("vi-VN")} ₫</span>
              </div>
              <hr />
              <div className="summary-item d-flex justify-content-between mb-4">
                <strong>Tổng cộng:</strong>
                <strong>
                  {orderData.total_price.toLocaleString("vi-VN")} ₫
                </strong>
              </div>

              <div className="payment-info mb-4">
                <h6>Phương thức thanh toán</h6>
                <div className="alert alert-light">
                  {orderData.payment_method === 1 ? (
                    <div>
                      <i className="fas fa-money-bill-wave me-2"></i>
                      Thanh toán khi nhận hàng (COD)
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-qrcode me-2"></i>
                      Thanh toán QR VNPAY
                    </div>
                  )}
                </div>
              </div>

              <button
                className="btn btn-lg btn-primary w-100"
                onClick={placeOrder}
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang xử lý...
                  </span>
                ) : (
                  <span>
                    {orderData.payment_method === 1 ? "Đặt hàng" : "Thanh toán ngay"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;