"use client"; 
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../utils/axiosInstance";
import { API_ENDPOINT } from "../../../../../services/apis";
const formatVND = (amount) => {
    return amount.toLocaleString("vi-VN") + " ₫";
  };
const OrderView = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchOrder = async () => {
            try {
                const response = await axiosInstance.get(`${API_ENDPOINT.ORDER.GET_ORDER}/${id}`);
                setOrder(response.data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);
    return (
        <div className="axil-dashboard-order-view">
            <p>Đơn hàng <strong>{order?.code}</strong> được đặt vào <strong>{order?.created_at}</strong> và hiện <strong>{order?.status_label}</strong>.</p>
            <div className="order-details">
                <h2 className="block-title">Order details</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.order_details.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name} <strong>X {product.quantity}</strong></td>
                                <td>{order ? formatVND(product.price) : "Đang tải..."}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Phương thức thanh toán:</th>
                            <th>{order?.payment_method}</th>
                        </tr>
                        <tr>
                            <th>Tổng:</th>
                            <th>{order ? formatVND(order.total_price) : "Đang tải..."}</th>
                        </tr>
                        <tr>
                            <th>Ghi chú:</th>
                            <th>{order?.note}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="order-address">
                <h2 className="block-title">Địa chỉ nhận hàng</h2>
                <address>
              <br />
               <p className="address-addresss"><i className="fa-sharp fa-thin fa-house"></i> {order?.address}</p>
                <p className="address-phone"><i className="far fa-phone"></i> {order?.phone}</p>
                <p className="address-email"><i className="far fa-envelope"></i> {order?.user?.email}</p>
                </address>
            </div>
        </div>
    );
}

export default OrderView;