import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MenuLogo from '../components/logoSection/MenuLogo';
import { useCart } from '../context/CartContext';

const ProductCategoryByBrand = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {addToCart} = useCart();
  const fetchProducts = async (brandName) => {
    if (!slug || !brandName) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await axios.get(`/api/products/${slug}/${brandName}`);
      setProducts(res.data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandSelect = (brandName) => {
    setSelectedBrand(brandName);
    fetchProducts(brandName);
  };

  // Reset when slug changes
  useEffect(() => {
    setSelectedBrand('');
    setProducts([]);
    setError('');
  }, [slug]);

  return (
    <div className="w-full flex flex-col items-center ">
      {/* Brand Selector */}
      <MenuLogo onBrandSelect={handleBrandSelect} />

      {/* Status */}
      {loading && <p className="text-center text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Product List */}
      {!loading && !error && products.length === 0 && selectedBrand && (
        <p className="text-center text-gray-400">No products for {selectedBrand}</p>
      )}
      <div
        className={`grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4 justify-center m-4`}
      >

        {products.map((item) => (
          <div
            key={item.id}
            className="px-2 py-4 md:border shadow-sm rounded-[15px] flex flex-col  md:max-w-[200px] w-full hover:scale-105 transition duration-100 ease-in-out"
            >
           
              <div className="w-full flex justify-center items-center h-[160px] mb-2 ">
               <Link
                to={`/product/${item.category}/${item.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}-${item.id}`}
              >
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

              
              </div>
              
                <div className='flex flex-row justify-between '>
                  <p className="text-base  font-bold truncate">${item.price}</p>
      
                    <button className="bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700 cursor-pointer" onClick={() => addToCart(item)}>
                      add
                    </button>
      
                </div>
             
            </div>
          
      ))}
      </div>
    </div>
  );
};

export default ProductCategoryByBrand;