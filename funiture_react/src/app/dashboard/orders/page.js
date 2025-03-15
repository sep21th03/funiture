"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "../../../utils/axiosInstance";
import { API_ENDPOINT } from "../../../services/apis";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(API_ENDPOINT.ORDER.GET_ORDERS);
            
            if (!response.data) {
              throw new Error("No data received from API");
            }
            setOrders(response.data.data);
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
        };
      
        fetchData(); 
      }, []);

  return (
    <div className="axil-dashboard-order">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Ngày đặt</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Tổng</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <th scope="row">#{order.code}</th>
                  <td>{order.created_at}</td>
                  <td>{order.status}</td>
                  <td>
                    ${order.total_price}
                  </td>
                  <td>
                    <Link
                      href={`/dashboard/orders/view/${order.id}`}
                      className="axil-btn view-btn"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
