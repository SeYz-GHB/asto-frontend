// MenuLogo.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MenuLogo = ({ onBrandSelect }) => {
  const { slug } = useParams();
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');

  const getBrands = useCallback(async () => {
    if (!slug) return;

    setLoading(true); 
    setError('');

    try {
      const res = await axios.get(`/api/brands-by-category/${slug}`);
      const fetchedBrands = res.data.brands || [];
      setBrands(fetchedBrands);

      // Auto-select first brand and trigger product fetch
      if (fetchedBrands.length > 0) {
        const firstBrand = fetchedBrands[0].name;
        setSelectedBrand(firstBrand);
        onBrandSelect?.(firstBrand);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load brands');
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, [slug]); // Removed onBrandSelect from dependencies

  const handleBrandClick = useCallback((brandName) => {
    setSelectedBrand(brandName);
    onBrandSelect?.(brandName); // Notify parent component
  }, [onBrandSelect]);

  useEffect(() => {
    setSelectedBrand(''); // Reset selected brand when slug changes
    getBrands();
  }, [slug, getBrands]); // This is now safe because getBrands only depends on slug

  if (loading) {
    return (
      <div className='mt-5 space-y-4 flex flex-col items-center animated-bg py-3 w-full'>
        <p className="text-gray-500">Loading brands...</p>
      </div>
    );
  }

  return (
    <div className='space-y-5 md:space-y-6 flex flex-col items-center animated-bg py-3 w-full'>
      <h4 className='text-center text-green-600'>Choose your brand</h4>
      
      {error && <p className="text-red-500">{error}</p>}
      
      {brands.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-4 md:gap-8'>
          {brands.map((brand) => (
            <div key={brand.id} className="group relative flex flex-col items-center">
              <button
                className={`w-12 h-12 md:w-18 md:h-18 border p-[5px] rounded-[15px] transition duration-200 ease-in-out ${
                  selectedBrand === brand.name
                    ? 'border-green-500 shadow-[0_0_15px_1px_#4ade80]'
                    : 'border-green-600 hover:scale-110'
                }`}
                onClick={() => handleBrandClick(brand.name)}
                aria-label={`Select ${brand.name} brand`}
              >
                <img
                  src={brand.image_url}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </button>
              <span className="absolute top-full text-white bg-black px-2 py-1 shadow opacity-0 group-hover:opacity-80 transition rounded-[10px] z-10 text-[8px] md:text-[12px] whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-400">No brands available for this category.</p>
      )}
      
      {selectedBrand && (
        <div className="text-green-600 text-xs border border-green-500 px-2 py-1 rounded-full shadow-sm">
          Selected: {selectedBrand}
        </div>
      )}
    </div>
  );
};

export default MenuLogo;