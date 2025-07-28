import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const SPEC_FIELDS = {
  mouse: [
    { key: "dpi", label: "DPI" },
    { key: "mouse_rgb", label: "RGB", bool: true },
    { key: "connection", label: "Connection" },
    { key: "battery", label: "Battery" },
    { key: "weight_grams", label: "Weight (g)" },
    { key: "mouse_color", label: "Color" },
    { key: "mouse_other_features", label: "Other Features" },
  ],
  keyboard: [
    { key: "layout", label: "Layout" },
    { key: "switch_type", label: "Switch Type" },
    { key: "keyboard_color", label: "Color" },
    { key: "keyboard_rgb", label: "RGB", bool: true },
    { key: "keyboard_connection", label: "Connection" },
    { key: "keycap_material", label: "Keycap Material" },
    { key: "keyboard_battery", label: "Battery" },
    { key: "keyboard_weight_grams", label: "Weight (g)" },
    { key: "keyboard_other_features", label: "Other Features" },
  ],
  headphone: [
    { key: "frequency_response", label: "Frequency Response" },
    { key: "mic", label: "Microphone", bool: true },
    { key: "headphone_connection", label: "Connection" },
    { key: "surround_sound", label: "Surround Sound", bool: true },
    { key: "headphone_battery", label: "Battery" },
    { key: "headphone_weight_grams", label: "Weight (g)" },
    { key: "headphone_color", label: "Color" },
    { key: "headphone_other_features", label: "Other Features" },
  ],
  monitor: [
    { key: "screen_size", label: "Screen Size" },
    { key: "resolution", label: "Resolution" },
    { key: "refresh_rate", label: "Refresh Rate" },
    { key: "panel_type", label: "Panel Type" },
    { key: "monitor_connection", label: "Connection" },
    { key: "monitor_color", label: "Color" },
    { key: "monitor_weight", label: "Weight" },
  ],
  mousepad: [
    { key: "size", label: "Size" },
    { key: "material", label: "Material" },
    { key: "thickness_mm", label: "Thickness (mm)" },
    { key: "mousepad_color", label: "Color" },
  ],
};

export default function ProductDetail() {
  const { slugId } = useParams(); // ✅ Example: ag-one-8k-21
  const id = slugId.split("-").pop(); // ✅ Extracts 21
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500 animate-pulse">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">❌ Product not found</p>
      </div>
    );
  }

  const specModel =
    product.MouseModel ||
    product.KeyboardModel ||
    product.HeadphoneModel ||
    product.MonitorModel ||
    product.MousepadModel;

  const fields = SPEC_FIELDS[product.category] || [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
        {/* Left: Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="rounded-xl max-h-[200px] object-contain"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-3xl font-extrabold text-gray-900">{product.name}</h4>
            <p className="text-xl font-semibold text-green-600 mt-2">${product.price}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">📄 Specifications</h2>
        <ul className="divide-y divide-gray-200">
          {fields.map((f) => (
            <li key={f.key} className="flex justify-between py-3">
              <span className="text-gray-700 font-medium">{f.label}</span>
              <span className="text-gray-900 font-semibold">
                {f.bool
                  ? specModel?.[f.key]
                    ? "✅ Yes"
                    : "❌ No"
                  : specModel?.[f.key] || "—"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
