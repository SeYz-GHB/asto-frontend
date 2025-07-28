import React, { useState } from 'react';
import { BsMouse } from "react-icons/bs";
import { FaRegKeyboard } from "react-icons/fa";
import { GiHeadphones } from "react-icons/gi";
import { LuMonitor } from "react-icons/lu";
import axios from 'axios';


const categories = [
  { label: "Mouse", icon: <BsMouse />, key: "mouse" },
  { label: "Mouse Pad", icon: <div className="w-6 h-6 md:w-15 md:h-15 bg-gray-300 rounded"></div>, key: "mousepad" },
  { label: "Keyboard", icon: <FaRegKeyboard />, key: "keyboard" },
  { label: "Headphone", icon: <GiHeadphones />, key: "headphone" },
  { label: "Monitor", icon: <LuMonitor />, key: "monitor" },
];

const categoryFields = {
  mouse: [
    { label: 'DPI', name: 'dpi', type: 'number', placeholder: 'e.g., 16000' },
    { label: 'RGB', name: 'mouse_rgb', type: 'select', options: ['yes', 'no'] },
    { label: 'Connection', name: 'mouse_connection', placeholder: 'e.g., USB, Wireless, Bluetooth' },
    { label: 'Battery', name: 'mouse_battery', placeholder: 'e.g., 1000mAh, N/A' },
    { label: 'Weight (grams)', name: 'mouse_weight_grams', type: 'number' },
    { label: 'Color', name: 'mouse_color' },
    { label: 'Other Features', name: 'mouse_other_features', type: 'textarea' },
  ],
  keyboard: [
    { label: 'Layout', name: 'layout', placeholder: 'e.g., TKL, 60%' },
    { label: 'Switch Type', name: 'switch_type', placeholder: 'e.g., Cherry MX Red' },
    { label: 'Color', name: 'keyboard_color' },
    { label: 'RGB', name: 'keyboard_rgb', type: 'select', options: ['yes', 'no'] },
    { label: 'Connection', name: 'keyboard_connection', placeholder: 'e.g., USB, Bluetooth' },
    { label: 'Keycap Material', name: 'keycap_material', placeholder: 'e.g., PBT, ABS' },
    { label: 'Battery', name: 'keyboard_battery', placeholder: 'e.g., 3000mAh, N/A' },
    { label: 'Weight (grams)', name: 'keyboard_weight_grams', type: 'number' },
    { label: 'Other Features', name: 'others_features', type: 'textarea' },
  ],
  mousepad: [
    { label: 'Size', name: 'size', placeholder: 'e.g., XL, 400x300mm' },
    { label: 'Material', name: 'material', placeholder: 'e.g., Cloth, Hard, Hybrid' },
    { label: 'Thickness (mm)', name: 'thickness_mm', type: 'number', placeholder: 'e.g., 3, 4, 5' },
    { label: 'Color', name: 'mousepad_color' },
  ],
  monitor: [
    { label: 'Screen Size', name: 'screen_size', placeholder: 'e.g., 24", 27"' },
    { label: 'Resolution', name: 'resolution', placeholder: 'e.g., 1920x1080' },
    { label: 'Refresh Rate', name: 'refresh_rate', placeholder: 'e.g., 60Hz, 144Hz' },
    { label: 'Panel Type', name: 'panel_type', placeholder: 'e.g., IPS, TN, VA' },
    { label: 'Connection', name: 'monitor_connection', placeholder: 'e.g., HDMI, DisplayPort' },
    { label: 'Color', name: 'monitor_color' },
    { label: 'Weight', name: 'monitor_weight', placeholder: 'e.g., 4.2kg' },
  ],
  headphone: [
    { label: 'Frequency Response', name: 'frequency_respone', placeholder: 'e.g., 20Hz–20kHz' },
    { label: 'Microphone', name: 'mic', type: 'select', options: ['yes', 'no'] },
    { label: 'Connection', name: 'headphone_connection', placeholder: 'e.g., 3.5mm, USB' },
    { label: 'Surround Sound', name: 'surround_sound', type: 'select', options: ['yes', 'no'] },
    { label: 'Battery', name: 'headphone_battery', placeholder: 'e.g., 30 hours, N/A' },
    { label: 'Weight (grams)', name: 'headphone_weight_grams', type: 'number' },
    { label: 'Color', name: 'headphone_color' },
    { label: 'Other Features', name: 'headphone_other_features', type: 'textarea' },
  ],
};


const AddNewProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }
      formDataToSend.append('button', categories[selectedCategory].key);

      const res = await axios.post('/api/products/single_product', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      setMessage(res.data.message || '✅ Product uploaded!');
      setFormData({});
    } catch (err) {
      setMessage('❌ ' + (err?.response?.data?.message || 'Upload failed'));
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryFields = () => {
  const key = categories[selectedCategory]?.key;  
  const fields = categoryFields[key] || [];

  return (
    <div>
      <h4 className="text-xl font-bold mb-4 mt-6">{categories[selectedCategory].label} Specifications</h4>

      {/* Grouped grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, i) => {
          const { label, name, type = 'text', placeholder, options } = field;

          if (type === 'textarea') {
            return (
              <div key={i} className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium mb-2">{label}</label>
                <textarea
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder={placeholder}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
            );
          }

          if (type === 'select') {
            return (
              <div key={i}>
                <label className="block text-sm font-medium mb-2">{label}</label>
                <select
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="">Select {label}</option>
                  {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={i}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


  return (
    <div className="w-full mb-8 ">
      <h3 className="text-2xl font-bold mb-6 text-center">Choose one category to input product</h3>

      <div className="flex gap-6 flex-wrap justify-between mb-8">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => { setSelectedCategory(i); setMessage(''); }}
            className={`flex flex-col items-center p-4 rounded-lg text-sm font-medium ${
              selectedCategory === i ? 'text-green-700 bg-green-50 border border-green-300' : 'text-gray-400 hover:text-gray-600'
            } cursor-pointer`}
          >
            <span className="text-2xl mb-1 md:text-6xl">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {selectedCategory !== null && (
        <form onSubmit={handleSubmit} className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LEFT SIDE — Basic Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold mb-4">Add {categories[selectedCategory].label}</h4>

              <div className="grid grid-cols-1 gap-4">
                {['name', 'brand', 'price', 'stock'].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium mb-2 capitalize">{field} *</label>
                    <input
                      type={['price', 'stock'].includes(field) ? 'number' : 'text'}
                      name={field}
                      value={formData[field] || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="single-product-image"
                  className="block text-sm font-medium mb-2"
                >
                  Upload Product Image
                </label>

                <div className='flex items-center justify-center w-full'>
                  <label htmlFor="single-product-image" 
                    className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-200 transition'
                  >
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <svg className='w-8 h-8 mb-3 text-gray-400' 
                        aria-hidden= "true"
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path 
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth= "2"
                          d='M12 4v16m8-8H4'
                        />
                        
                      </svg>
                      <p className='mb-1 text-sm text-gray-500 '>
                        <span className='font-semibold'>
                          Click to upload
                        </span>
                        or drag & drop your image
                      </p>
                      <p className='text-xs text-gray-500'>
                        Ony PNG, JPG, JPEG (max 5MB)
                      </p>
                    </div>
                     <input
                        id="single-product-image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleInputChange}
                        required
                        className="hidden"
                      />
                  </label>

                </div>
              </div>

            </div>

            {/* RIGHT SIDE — Category-Specific Fields */}
            <div className='flex flex-col gap-5'>
              {renderCategoryFields()}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[200px] w-full"
              >
                {loading ? 'Creating Product...' : 'Create Product'}
              </button>
            </div>

           

            {/* FULL-WIDTH MESSAGE */}
            {message && (
              <div className="md:col-span-2 text-center p-3 rounded-md 
                ${message.includes('✅') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}">
                {message}
              </div>
            )}

          </form>
          

      )}
      
      
    </div>
  );
};

export default AddNewProducts;
