import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Recipt from "./Recipt";

const QRPayment = () => {
  const { orderId } = useParams();
  const [amount, setAmount] = useState(null);
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false); 
  const navigate = useNavigate();

  // Fetch order amount
  useEffect(() => {
    if (!orderId) return;
    axios
      .get(`/api/checkout/order/${orderId}`)
      .then((res) => setAmount(res.data.amount))
      .catch((err) => console.error("Failed to fetch order amount:", err));
  }, [orderId]);

  useEffect(() => {
    if (!amount || !orderId) return;
    axios
      .get(`/api/payment/qr`, { params: { amount, orderId } })
      .then((res) => setQrImage(res.data.qrImage))
      .catch((err) => console.error("Failed to get QR:", err));
  }, [amount, orderId]);

  const handlePayNow = async () => {
    setLoading(true);
    try {
      console.log("💳 Attempting to mark order as paid:", orderId);
      
      const paymentData = {
        paymentStatus: 'completed',
        paidAt: new Date().toISOString()
      };
      
      console.log("📤 Sending payment data:", paymentData);
      
      const response = await axios.put(`/api/checkout/mark-paid/${orderId}`, paymentData);
      
      console.log("✅ Payment API response:", response.data);
      
      toast.success("✅ Payment successful! Order marked as paid.");
      setPaid(true);
      
      // Optional: Navigate to profile page after a delay
      setTimeout(() => {
        navigate('/User-profile');
      }, 2000);
      
    } catch (err) {
      console.error("❌ Payment API error:", err.response?.data || err.message);
      toast.error("❌ Failed to mark payment.");
    } finally {
      setLoading(false);
    }
  };

  if (!amount) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-3">Demo Payment</h2>

      {qrImage && (
        <img
          src={qrImage}
          alt="KHQR"
          className="mx-auto w-52 h-52 mb-3"
        />
      )}

      <p className="text-lg font-semibold">Amount: ${amount}</p>
      <p className="text-sm text-gray-600 mb-4">Order ID: {orderId}</p>

      {!paid && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mb-4">
          <p className="text-sm text-yellow-800">
            ⚠️ This order will only appear in your profile after payment is completed.
          </p>
        </div>
      )}

      <button
        onClick={handlePayNow}
        disabled={loading || paid}
        className={`text-white px-4 py-2 rounded w-full mt-3 transition-colors ${
          loading || paid 
            ? "bg-gray-400 cursor-not-allowed" 
            : "background_rgb cursor-pointer"
        }`}
      >
        {paid ? "✅ Payment Completed" : loading ? "Processing..." : "Pay Now (Demo)"}
      </button>

      {paid && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800 text-sm">
            ✅ Payment successful! This order will now appear in your profile.
          </p>
        </div>
      )}
    </div>
  );
};

export default QRPayment;