import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaRegTrashAlt } from "react-icons/fa";

const ProductOrder = () => {
  const {
    cart,
    removeFromCart,
    increaseFromCart,
    decreaseFromCart,
  } = useCart();

  return (
    <div className="w-full md:w-[65%] md:max-h-[80vh] overflow-y-auto thin-scroll rounded-md p-4 bg-white md:sticky md:top-25 shadow-sm">
      {cart.map(item => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 border-b"
        >
          {/* Image + Info */}
          <div className="flex items-center gap-4 w-full sm:w-[60%]">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-20 h-20 object-contain bg-gray-100 rounded"
            />
            <div className="max-w-full">
              <h6 className="text-base sm:text-lg font-semibold break-words max-w-[60vw] sm:max-w-[200px]">
                {item.name}
              </h6>
              <p className="text-gray-600">${Number(item.price || 0).toFixed(2)}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
            <div className="flex items-center justify-between w-full gap-5">
              <div className='flex gap-3 items-center'>
                <button
                  className="px-2 text-base bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => decreaseFromCart(item.id)}
                >
                  -
                </button>
                <span className="w-6 text-center text-base">{item.quantity}</span>
                <button
                  className="px-2 text-base bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => increaseFromCart(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="text-gray-500 text-xl hover:text-red-600"
                onClick={() => removeFromCart(item.id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductOrder;
