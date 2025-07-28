// Updated LogoRun Component - shows ALL brands (not filtered by category)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogoRun = () => { // No category prop needed since we want all brands
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getBrands = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Get all brands endpoint
      const res = await axios.get(`/api/brands`);
      const fetchedBrands = res.data.brands || [];
      setBrands(fetchedBrands);
    } catch (error) {
      setError(error.response?.data?.message );
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []); // Empty dependency array since we don't need to refetch

  if (loading) {
    return <div className="text-gray-500">Loading brands...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (    
    <div className='w-full overflow-hidden m-1'>
      <div className='flex gap-5 logoRun'>
        {brands.map((brand, index) => (
          <img
            key={brand.id || index} // Use brand.id if available
            src={brand.image_url}
            alt={brand.name}
            className='w-8 h-8 object-contain md:w-12 md:h-12'
          />
        ))}
      </div>
    </div>
  );
};

export default LogoRun;