"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const PaymentResult = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const orderCode = params.id;

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        
        if (vnp_ResponseCode === "00") {
          setPaymentSuccess(true);
          
          // await axiosInstance.post(`${API_ENDPOINT.ORDER.UPDATE_STATUS}/${orderCode}`, {
          //   status: "paid"
          // });
          
          toast.success("Thanh toán thành công!");
          setTimeout(() => {
            router.push(`/dashboard/cart/order-success/${orderCode}`);
          }, 2000);
        } else {
          setPaymentSuccess(false);
          
          // await axiosInstance.post(`${API_ENDPOINT.ORDER.UPDATE_STATUS}/${orderCode}`, {
          //   status: "cancelled" 
          // });
          
          toast.error("Thanh toán thất bại hoặc đã bị hủy!");
        }
      } catch (error) {
        console.error("Lỗi xử lý kết quả thanh toán:", error);
        toast.error("Đã xảy ra lỗi khi xử lý kết quả thanh toán");
        setPaymentSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [orderCode, router]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="card">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Đang xử lý...</span>
            </div>
            <p className="mt-3">Đang xử lý kết quả thanh toán...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentSuccess) {
    return (
      <div className="container py-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="mb-4">
              <i className="fas fa-times-circle text-danger" style={{ fontSize: "5rem" }}></i>
            </div>
            <h2 className="mb-4">Thanh toán không thành công!</h2>
            <p className="mb-4">
              Thanh toán đơn hàng {orderCode} đã bị hủy hoặc gặp lỗi. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
            </p>
            <div className="d-flex justify-content-center">
              <Link href="/dashboard/cart" className="btn btn-primary me-2">
                Quay lại giỏ hàng
              </Link>
              <Link href="/" className="btn btn-outline-primary">
                Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body text-center">
          <div className="mb-4">
            <i className="fas fa-check-circle text-success" style={{ fontSize: "5rem" }}></i>
          </div>
          <h2 className="mb-4">Thanh toán thành công!</h2>
          <p className="mb-4">
            Cảm ơn bạn đã thanh toán. Đơn hàng {orderCode} của bạn đang được xử lý.
          </p>
          <p className="text-muted mb-4">Đang chuyển hướng đến trang chi tiết đơn hàng...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;