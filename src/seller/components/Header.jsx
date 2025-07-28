import React from "react";
import asto_logo from "../../assets/logoes/asto_logo.jpg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ setVisible }) => {
  return (
    <div>
      <nav className="w-full border-b border-green-600 shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-1 max-w-[1920px] mx-auto">
          {/* Left: Sidebar Toggle + Title */}
          <div className="flex items-center gap-4">
            <FaBars
              className="text-xl md:text-2xl cursor-pointer"
              onClick={() => setVisible((prev) => !prev)}
            />
            <h2 className="text-lg md:text-xl font-semibold">Dashboard</h2>
          </div>

          {/* Center: Logo */}
          <Link to="/seller-dashboard">
            <img
              src={asto_logo}
              alt="asto_logo"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* Right: Buttons */}
          <div className="hidden sm:flex gap-3">
           

            <Link
              to="/logout"
              className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
