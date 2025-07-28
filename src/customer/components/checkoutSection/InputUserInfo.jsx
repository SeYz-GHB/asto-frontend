import React, { useState } from 'react';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaPhone, FaSpinner } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const InputUserInfo = ({ total, cart }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Add this

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name || !phone || !address) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customer_name: name,
        phone_number: phone,
        shipping_address: address,
        total,
        cart
      };

      const res = await axios.post(
  "/api/checkout/Recipt-generator",
  payload,
  { withCredentials: true } // ✅ Send cookies/token
);

      const orderId = res.data.orderId; // ✅ Must be returned from backend
      toast.success("Order created successfully!");

      navigate(`/payment/${orderId}`); // ✅ Go to QRPayment page
    } catch (error) {
      console.error("Order failed: ", error.response?.data);
      toast.error("Order creation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' border-gray-700 w-full mx-auto rounded-lg shadow-md'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
        <h6 className='text-xl font-semibold border-b border-gray-600 pb-2 mb-2'>Billing Address</h6>

        <div>
          <label className='text-sm mb-1 block'>Full Name</label>
          <div className='flex items-center bg-white rounded px-3 border-1'>
            <MdDriveFileRenameOutline className='text-gray-500 text-xl' />
            <input
              type="text"
              placeholder='Enter your name'
              className='flex-1 p-2 outline-none text-black'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className='text-sm mb-1 block'>Phone Number</label>
          <div className='flex items-center bg-white rounded px-3 border-1'>
            <FaPhone className='text-gray-500 text-lg' />
            <input
              type="text"
              placeholder='Phone number'
              className='flex-1 p-2 outline-none text-black'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h6 className='text-xl font-semibold border-b border-gray-600 pb-2 mb-2'>Shipping Address</h6>
          <textarea
            className='w-full p-3 rounded resize-none outline-none border-1'
            placeholder='Enter your full shipping address...'
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <button
          type='submit'
          className={`font-medium px-4 py-2 text-center rounded 
            ${!name || !phone || !address || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'}`}
          disabled={!name || !phone || !address || loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Complete Order"}
          
        </button>
      </form>
      
    </div>
  );
};

export default InputUserInfo;
