/* import React, { useState } from 'react';
import axios from 'axios';
import BrandList from './BrandList';

const Brands = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return setMessage('🛑 Please fill in both fields.');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      setLoading(true);
      const res = await axios.post('/api/brands', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(res.data.message || '✅ Brand created successfully.');
      setName('');
      setImage(null);
      document.getElementById('brandImageInput').value = ''; // reset file input
    } catch (err) {
      setMessage(err.response?.data?.message || ' Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mb-8' >
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Add New Brand 🏷️</h2>

      <form onSubmit={handleBrandSubmit}  className="  bg-white border p-6 mt-8 rounded-md shadow-md space-y-5 w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              const input = e.target.value;
              const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
              setName(capitalized);
            }}
            placeholder="e.g. Razer, Logitech"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-600 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Logo
          </label>
          <label
            htmlFor="brandImageInput"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3 text-gray-400"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16V4m0 0l4 4m-4-4L3 8m14 4v8m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <p className="mb-1 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG (max 5MB each)</p>
            </div>
            <input
              id="brandImageInput"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition duration-200 cursor-pointer"
        >
          {loading ? 'Uploading...' : 'Create Brand'}
        </button>

        {message && (
          <p
            className={`text-sm font-medium mt-2 ${
              message.includes('success') || message.includes('✅')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Brands; */
import React, { useState } from 'react';
import axios from 'axios';
import BrandList from './BrandList';
import { useAuthStore } from '../../../auth/authStore';


const Brands = () => {
  const { user } = useAuthStore(); // ✅ Get logged-in user role
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return setMessage('🛑 Please fill in both fields.');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      setLoading(true);
      const res = await axios.post('/api/brands', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message || '✅ Brand created successfully.');
      setName('');
      setImage(null);
      document.getElementById('brandImageInput').value = '';
    } catch (err) {
      setMessage(err.response?.data?.message || ' Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Brand List 🏷️</h2>

      {/* ✅ Show Add Brand Form ONLY if Admin */}
      {user?.role === 'admin' && (
        <form
          onSubmit={handleBrandSubmit}
          className="bg-white border p-6 mt-8 rounded-md shadow-md space-y-5 w-full"
        >
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              const input = e.target.value;
              const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
              setName(capitalized);
            }}
            placeholder="e.g. Razer, Logitech"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-600 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Logo
          </label>
          <label
            htmlFor="brandImageInput"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3 text-gray-400"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16V4m0 0l4 4m-4-4L3 8m14 4v8m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <p className="mb-1 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG (max 5MB each)</p>
            </div>
            <input
              id="brandImageInput"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition duration-200 cursor-pointer"
        >
          {loading ? 'Uploading...' : 'Create Brand'}
        </button>

        {message && (
          <p
            className={`text-sm font-medium mt-2 ${
              message.includes('success') || message.includes('✅')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
          ...
        </form>
      )}

      {/* ✅ Always show the Brand List */}
      <BrandList canDelete={user?.role === 'admin'} />
    </div>
  );
};

export default Brands;
