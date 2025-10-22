"use client";

import { useEffect, useState } from "react";
import { ordersAPI } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await ordersAPI.getAll(params);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, newStatus);
      alert("Order status updated successfully!");
      fetchOrders();
    } catch (error) {
      alert(error.message || "Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">Manage customer orders</p>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === ""
              ? "bg-primary-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          All Orders
        </button>
        {["pending", "processing", "shipped", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === status
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="card">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : orders.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="font-mono text-sm">
                    {order._id.substring(0, 8)}...
                  </td>
                  <td>
                    <div>
                      <p className="font-medium">{order.user?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">
                        {order.user?.email || ""}
                      </p>
                    </div>
                  </td>
                  <td>{order.items.length} item(s)</td>
                  <td className="font-semibold text-primary-600">
                    {formatPrice(order.total)}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="text-sm text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500">No orders found</p>
        </div>
      )}
    </div>
  );
}
