import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

const Recipt = ({ shippingFee = 0, tax = 0, total = 0, cart = [] }) => {
    
  return (
    <div>
      <div className='flex flex-col md:gap-5 p-4 rounded-[10px] border-1'>
        <h6 className="text-lg font-semibold mb-4">CART TOTALS</h6>
        <hr className="mb-4" />
        
        {/* ADD THIS SAFETY CHECK BACK */}
        {cart && cart.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          cart && cart.map(item => (
            <div className='flex justify-between' key={item.id}>
                <div className='flex gap-5 justify-between w-[30%]'>
                    <p className='truncate overflow-hidden whitespace-nowrap text-ellipsis'>{item.name}</p>
                    <p>({item.quantity})</p>
                </div>
                <p>${item.price}</p>
            </div>
          ))
        )}

        <div className="flex justify-between text-gray-600 mb-2">
          <p>Shipping:</p>
          <span className={shippingFee === 0 ? 'text-green-600' : ''}>
            {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-600 mb-2">
          <p>TAX (estimated for Cambodia - VAT 0%):</p>
          <p>${tax.toFixed(2)}</p>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between text-xl font-bold mb-4">
          <p>Total:</p>
          <p className="text-green-600">${total.toFixed(2)}</p>
        </div>

      
      </div>
    </div>
  );
};

export default Recipt;