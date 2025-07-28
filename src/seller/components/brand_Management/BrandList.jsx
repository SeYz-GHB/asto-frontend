import React, { useEffect, useState } from 'react';
import axios from 'axios';



const BrandList = ({ canDelete = false }) => {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState('');

  const getBrands = async () => {
    try {
      const res = await axios.get('/api/brands');
      setBrands(res.data.brands || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load brands');
    }
  };

  const deleteBrands = async (id) => {
    try {
      await axios.delete(`/api/brands/${id}`);
      setBrands((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete brand');
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {error && <p className="text-red-500">{error}</p>}
      {brands.length > 0 ? (
        brands.map((brand) => (
          <div
            key={brand.id}
            className="gap-4 flex items-center justify-between border-b-1 px-4 p-1"
          >
            <img
              src={brand.image_url}
              alt={brand.name}
              className="h-10 object-contain w-15 md:w-20"
            />

            {/* ✅ Delete Button Only if Admin */}
            {canDelete && (
              <button
                className="bg-red-600 p-1 rounded text-white text-sm"
                onClick={() => deleteBrands(brand.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400">No brands to display.</p>
      )}
    </div>
  );
};

export default BrandList;
