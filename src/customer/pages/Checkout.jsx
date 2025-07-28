import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaRegTrashAlt } from "react-icons/fa";


import InputUserInfo from '../components/checkoutSection/InputUserInfo';
import Recipt from '../components/checkoutSection/Recipt';
import ProductOrder from '../components/checkoutSection/ProductOrder';
import UserProfilePage from '../../auth/page/UserProfilePage';

const Checkout = () => {
  const {
    cart,
    removeFromCart,
    increaseFromCart,
    decreaseFromCart,
    getCartCount,
  } = useCart();

  const [turnOnPayment, setTurnOnPayment] = useState(false);
  


  return (
    <div className="w-full mx-auto">
      <div className='bg-black opacity-100 py-1 sticky top-12'>
        <h4 className="text-2xl font-bold px-4 md:px-35 bg-green-600 text-white animatText">🛍️ Buy from 2, free delivery</h4>
      </div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
         {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-10">
          
          <ProductOrder />

          {/* Cart Totals */}
          <div className="w-full md:w-[35%]  rounded-md bg-gray-50 shadow-md">
            {(() => {
              const count = getCartCount() || cart.length;
              const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
              const tax = 0.0;
              const shippingFee = count >= 2 ? 0 : 2;
              const total = subtotal + tax + shippingFee;

              return (
                <div className="flex flex-col text-sm sm:text-base">
                  <div className="flex flex-col text-sm sm:text-base">
                    <Recipt
                      cart = {cart}
                      shippingFee={shippingFee}
                      tax={tax}
                      total={total}
                      onProceed={() => setTurnOnPayment(true)}
                      disabled={turnOnPayment}
                    />
                    
                    
                      <div className="transition duration-150 ease-in-out mt-4">
                        <InputUserInfo total={total} cart = {cart}/> 
                      </div>
                      {false && (
                       <UserProfilePage
                          cart={cart}
                          shippingFee={shippingFee}
                          tax={tax}
                          total={total}
                          onProceed={() => setTurnOnPayment(true)}
                          disabled={turnOnPayment}
                        />

                      )}

                    
                  </div>

                </div>
              );
            })()}
          </div>
        </div>
      )}
      </div>
     
    </div>
  );
};

export default Checkout;
