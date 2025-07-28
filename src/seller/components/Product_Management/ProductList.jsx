import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../../customer/context/CartContext';


const ProductList = ({ visible, seller }) => {
  const [displayProduct, setDisplayProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchedPages = useRef(new Set()); 
  
  const {addToCart} = useCart();


  const fetchProducts = async () => {
    // 🔁 Prevent duplicate fetch for same page
    if (fetchedPages.current.has(page)) return;

    try {
      const res = await axios.get(`/api/products?page=${page}&limit=10`);
      const newProducts = res.data.products;

      // ✅ Filter out duplicates (by ID)
      setDisplayProduct((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const unique = newProducts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...unique];
      });

      setHasMore(newProducts.length > 0);
      fetchedPages.current.add(page); // ✅ Mark this page as fetched
    } catch (err) {
      console.error('❌ Error fetching products:', err);
    }
   


 
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <div>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 ${
          visible ? 'xl:grid-cols-5 lg:grid-cols-4' : 'lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid'
        } gap-4 content-center`}
      >

        {displayProduct.map((item) => (
          <div
            key={item.id}
            className="px-2 py-4 md:border shadow-sm rounded-[15px] flex flex-col md:max-w-[200px] w-full hover:scale-105 transition duration-100 ease-in-out"
            >
           
              <div className="w-full flex justify-center items-center h-[160px] mb-5 ">
               <Link to={`product/${item.category}/${item.name.toLowerCase().replace(/\s+/g, "-")}-${item.id}`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="max-h-40 w-auto object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Info Box */}
              <div className="flex flex-col ">
                <p className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </p>

                {seller? <p className="text-base  font-bold">${item.price}</p> : " "}
              </div>
              {seller ? (
                <div className="flex justify-between md:justify-end md:gap-6">
                  <button className="text-green-600 hover:underline cursor-pointer">Edit</button>
                  <button className="text-red-600 hover:underline cursor-pointer">Delete</button>
                </div>
              ) : (
                <div className='flex flex-row justify-between '>
                  <p className="text-base  font-bold truncate">${item.price}</p>
      
                    <button className="bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700 cursor-pointer" onClick={() => addToCart(item)}>
                      add
                    </button>
      
                </div>
              )}
            </div>
          
      ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
