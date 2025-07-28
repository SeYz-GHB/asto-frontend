import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const UserProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user/my-orders", { withCredentials: true })
      .then((res) => {
        console.log("🔍 All orders from API:", res.data.orders); // Debug: see all orders
        
        // Check what payment statuses exist
        (res.data.orders || []).forEach(order => {
          console.log(`Order ${order.id}:`, {
            hasPayment: !!order.Payment,
            paymentStatus: order.Payment?.status,
            orderStatus: order.status
          });
        });
        
        // Try different filter conditions to see what works
        const allOrders = res.data.orders || [];
        
        // Option 1: Filter by payment status 'completed'
        const completedPayments = allOrders.filter(order => 
          order.Payment && order.Payment.status === 'completed'
        );
        
        // Option 2: Filter by payment status 'paid' (in case backend uses different status)
        const paidPayments = allOrders.filter(order => 
          order.Payment && order.Payment.status === 'paid'
        );
        
        // Option 3: Filter by order status (in case payment status isn't updated)
        const paidOrderStatus = allOrders.filter(order => 
          order.status === 'paid' || order.status === 'completed'
        );
        
        console.log("✅ Completed payments:", completedPayments);
        console.log("💰 Paid payments:", paidPayments);
        console.log("📋 Paid order status:", paidOrderStatus);
        
        // Use the filter that returns results
        let ordersToShow = completedPayments;
        if (ordersToShow.length === 0) ordersToShow = paidPayments;
        if (ordersToShow.length === 0) ordersToShow = paidOrderStatus;
        
        setOrders(ordersToShow);
      })
      .catch((err) => console.error("❌ Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <div className=" w-full px-6 flex flex-col">
       <div className="flex gap-4 mt-6 w-full flex-col md:flex-row md:justify-between mb-10 items-center shadow-2xl py-5 px-2 rounded-[15px]">
         <h2 className="text-2xl font-bold mb-6 ">📜 My Orders & Receipts</h2>
        <div className="gap-5 flex ">
            <Link
            to="/logout"
            className="px-4 py-2 bg-red-600 text-white rounded-[15px] border-1 hover:bg-red-400 transition"
          >
            Logout
          </Link>

          
        </div>
      </div>
      

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't completed any payments yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 shadow-2xl rounded-[15px] ">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col p-4 rounded-[10px] border">
              <h3 className="text-lg font-semibold mb-2">
                Order #{order.id} – <span className="capitalize">{order.status}</span>
              </h3>
              <p className="text-gray-500 mb-2">
                Date: {new Date(order.created_at).toLocaleString()}
              </p>

              <hr className="mb-3" />

              {order.items?.length === 0 ? (
                <p className="text-gray-500">No products in this order.</p>
              ) : (
                order.items.map((item) => (
                  <div className="flex justify-between mb-2" key={item.id}>
                    <div className="flex gap-2  w-[60%]">
                      <p className="truncate text-sm">{item.product?.name}</p>
                      <p className="text-sm">({item.quantity})</p>
                    </div>
                    <p className="text-sm">${item.product?.price}</p>
                  </div>
                ))
              )}

              <div className="flex justify-between text-gray-600 mt-3 text-sm">
                <p>Shipping:</p>
                <span className={order.total_price >= 50 ? "text-green-600" : ""}>
                  {order.total_price >= 50 ? "Free" : "$5.00"}
                </span>
              </div>

              <div className="flex justify-between text-gray-600 mb-2 text-sm">
                <p>TAX (VAT 0% in Cambodia):</p>
                <p>$0.00</p>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between text-lg font-bold mb-4">
                <p>Total:</p>
                <p className="text-green-600">${order.total_price}</p>
              </div>

              {order.Payment && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg mt-auto">
                  <h4 className="font-semibold text-sm text-green-800">✅ Payment Completed</h4>
                  <p className="text-sm text-green-700">Status: {order.Payment.status}</p>
                  <p className="text-sm text-green-700">Transaction ID: {order.Payment.transaction_id || "N/A"}</p>
                  <p className="text-sm text-green-700">
                    Paid At:{" "}
                    {order.Payment.paid_at
                      ? new Date(order.Payment.paid_at).toLocaleString()
                      : "Not Available"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default UserProfilePage;