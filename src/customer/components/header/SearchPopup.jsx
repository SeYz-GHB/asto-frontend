import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPopup = ({ toggleSearchPopup, searchPopup }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const CATEGORY_KEYWORDS = {
    mouse: ["mouse", "mouses"],
    keyboard: ["keyboard", "keyboards"],
    headphone: ["headphone", "headphones", "headset"],
    monitor: ["monitor", "monitors"],
    mousepad: ["mousepad", "mousepads", "mouse pad", "mouse pads"],
  };

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setAllProducts(res.data.products || []);
    });
  }, []);

  // ✅ Fixed detectCategory to prioritize exact and longest matches
  const detectCategory = (term) => {
    const lowerTerm = term.toLowerCase();

    // 1️⃣ Exact match first
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      if (keywords.includes(lowerTerm)) {
        return category;
      }
    }

    // 2️⃣ Partial match (longer keywords first)
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
      for (const keyword of sortedKeywords) {
        if (lowerTerm.startsWith(keyword)) {
          return category;
        }
      }
    }

    return null;
  };

  const getFilteredItems = () => {
    if (!searchTerm.trim()) return [];

    const categoryMatch = detectCategory(searchTerm.trim());
    if (categoryMatch) {
      return [{ isCategory: true, category: categoryMatch, name: categoryMatch }];
    }

    const term = searchTerm.toLowerCase();
    return allProducts.filter((p) => p.name.toLowerCase().includes(term));
  };

  const handleSearchSubmit = () => {
    if (!searchTerm.trim()) return;

    const categoryMatch = detectCategory(searchTerm.trim());
    if (categoryMatch) {
      navigate(`/category/${categoryMatch}`);
      toggleSearchPopup();
      return;
    }

    const term = searchTerm.toLowerCase();
    const matchedProducts = allProducts.filter((p) =>
      p.name.toLowerCase().includes(term)
    );

    if (matchedProducts.length > 0) {
      const first = matchedProducts[0];
      navigate(
        `/product/${first.category}/${first.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-${first.id}`
      );
      toggleSearchPopup();
    } else {
      alert(" No products found");
    }
  };

  return (
    <>
      <button onClick={toggleSearchPopup} aria-label="Open search">
        <IoIosSearch className="cursor-pointer md:text-2xl" />
      </button>

      {searchPopup && (
        <div className="fixed left-0 right-0 top-12 flex justify-center z-10">
          <div className="bg-white shadow-lg rounded-b-md p-4 w-full md:max-w-[1920px]">
            {/* 🔎 Input */}
            <div className="flex flex-row items-center gap-2 border-b pb-2">
              <IoIosSearch
                className="text-gray-400 text-base cursor-pointer"
                onClick={handleSearchSubmit}
              />
              <input
                type="text"
                className="w-full text-gray-600 focus:outline-none font-medium text-sm"
                placeholder="Search"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
            </div>

            {/* 🔽 Result List */}
            <div className="overflow-y-auto max-h-80 mt-2">
              {getFilteredItems().length > 0 ? (
                <>
                  <p className="font-semibold text-gray-400 text-xs mb-1">
                    Search Results
                  </p>
                  {getFilteredItems().map((item, idx) => (
                    <div key={idx}>
                      {item.isCategory ? (
                        <button
                          onClick={() => {
                            navigate(`/category/${item.category}`);
                            toggleSearchPopup();
                          }}
                          className="block w-full text-left text-gray-600 hover:text-green-600 font-medium text-sm hover:underline py-1"
                        >
                          {item.category} products
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            navigate(
                              `/product/${item.category}/${item.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-${item.id}`
                            );
                            toggleSearchPopup();
                          }}
                          className="block w-full text-left text-gray-700 text-sm hover:text-green-600 hover:bg-gray-50 py-1 px-2 rounded"
                        >
                          {item.name}
                        </button>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                searchTerm.trim() && (
                  <p className="text-xs text-gray-500 px-2"> Product not found</p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPopup;
