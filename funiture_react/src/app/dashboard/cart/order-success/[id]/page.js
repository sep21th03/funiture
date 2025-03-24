"use client";
import Link from "next/link";

const OrderSuccess = ({params}) => {
  const orderCode = params.id;


  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body text-center">
          <div className="mb-4">
            <i className="fas fa-check-circle text-success" style={{ fontSize: "5rem" }}></i>
          </div>
          <h2 className="mb-4">Đặt hàng thành công!</h2>
          <p className="mb-4">
            Cảm ơn bạn đã đặt hàng. Đơn hàng {orderCode} của bạn đã được xác nhận và đang được xử lý.
          </p>
          <div className="d-flex justify-content-center">
            <Link href="/dashboard/orders" className="btn btn-lg btn-primary me-2">
              Xem đơn hàng của tôi
            </Link>
            <Link href="/" className="btn btn-lg btn-outline-primary">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;