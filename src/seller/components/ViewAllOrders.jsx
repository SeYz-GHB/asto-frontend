import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ Fixed: Changed from /api/admin/users/ to /api/payment/admin-orders
        const res = await axios.get("/api/payment/admin-orders");

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 bg-white shadow-md">
              <div className="flex justify-between mb-3">
                <h4 className="font-semibold text-lg">Order #{order.id}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "shipped"
                      ? "bg-blue-200 text-blue-800"
                      : order.status === "delivered"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-sm"> <b>{order.customer_name}</b></p>
                <p className="text-sm"> {order.phone_number}</p>
                <p className="text-sm"> {order.shipping_address}</p>
              </div>

              <p className="mb-3 font-semibold text-green-600">
                 Total: ${Number(order.total_price).toFixed(2)}
              </p>

              <div>
                <h4 className="font-semibold text-sm mb-2"> Products:</h4>
                <div className="space-y-2">
                  {order.items && order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm border-b pb-2">
                      {item.product && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
                        <p className="text-gray-600">
                          {item.quantity} × ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllOrders;