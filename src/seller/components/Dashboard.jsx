import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import AddNewProducts from './Product_Management/AddNewProduct';
import ProductList from './Product_Management/ProductList';
import BulkUploadCSV from './Product_Management/BulkUploadCSV';
import asto_logo from "../../assets/logoes/asto_logo.jpg";
import { 
    Product_Management, 
    Category_Brand_Management,
    Overview_Analytics,
    Order_Management,
    Customer_Management,
    Reviews_Ratings,
    Media_Manager,
    Reports_Analytics,
    Security_Setting,
    Notifications
} from './NavbarLinkUrl';
import BrandList from './brand_Management/BrandList';
import Brands from './brand_Management/Brands';
import ViewAllUsers from './ViewAllUsers';
import ViewAllOrders from './ViewAllOrders';

const menu = [
    {choice : "Overview / Analytics", icon : "📊"},
    {choice : "Product Management", icon : "📦"},
    {choice : "Category / Brand Management", icon : "🏷️"}, 
    {choice : "Customer Management", icon : "👥"}, 
    {choice : "Order Management", icon : "📬"},
    {choice : "Reviews & Ratings", icon : "⭐"},
    {choice : "Media / Cloudinary Manager", icon : "🖼️"},
    {choice : "Reports & Analytics", icon : "📊"},
    {choice : "Security & Setting", icon : "🔐"},
    {choice : "Notifications", icon : "🔔"}
]


const NavbarDashboard = ({visible}) => {
    const [active, setActive] = useState('Overview / Anlaytics');
    const location = useLocation();
   
    const renderContent = () => {
        switch (active) {
        case "Overview / Analytics":
            return <Overview_Analytics />;
        case "Product Management":
            return <Product_Management />;
        case "Customer Management":
            return <Customer_Management />;
            case "Order Management":
            return <Order_Management />;
        case "Category / Brand Management": 
            return <Category_Brand_Management />;
        case "Reviews & Ratings":
            return <Reviews_Ratings />;
        case "Media / Cloudinary Manager":
            return <Media_Manager />;
        case "Reports & Analytics":
            return <Reports_Analytics />;
        case "Security & Setting":
            return <Security_Setting />;
        case "Notifications":
            return <Notifications />;
        default:
            return <div>Select a section</div>;
        }
    };
  



  return (
    <div className='w-full min-h-screen'>
      
        <h4 className='background_rgb px-3 text-white sticky top-0 z-50'>Admin</h4>
        <div className='w-full flex'>
                    <aside
            className={`w-0 h-[calc(100vh-52px)] overflow-y-auto thin-scroll bg-white border-r-2 border-gray-300 transition-transform duration-300 ${
              visible
                ? "translate-x-0 md:w-[30%] w-full sticky top-[52px]"
                : "-translate-x-full"
            } z-40`}
          >
            <ul className="min-h-full">
              {menu.map((eachChoice, index) => (
                <li
                  key={index}
                  onClick={() => setActive(eachChoice.choice)}
                  className={`flex flex-col gap-2 py-4 cursor-pointer ${
                    active === eachChoice.choice ? "bg-gray-200" : ""
                  } transition duration-300 border-b-1 border-gray-300`}
                >
                  <div className="flex bg-white px-4 justify-between">
                    <span className="hover:text-green-800">{eachChoice.choice}</span>
                    <span>{eachChoice.icon}</span>
                  </div>
                  <div className="flex justify-end px-2">
                    {active === eachChoice.choice && renderContent(eachChoice.choice)}
                  </div>
                </li>
              ))}
            </ul>
          </aside>

        <main
  className={`p-6 py-10 ${
    visible
      ? "hidden md:w-[75%] md:inline-flex md:flex-col items-center"
      : "w-full flex flex-col items-center"
  }`}
>
  {/* ✅ Show logo only on the main dashboard page */}
  {location.pathname === "/seller-dashboard" && (
    <img src={asto_logo} alt="Logo" className="opacity-10" />
  )}

  {location.pathname === "/seller-dashboard/products/new" && (
    <div>
      <AddNewProducts />
      <ProductList visible={visible} seller={true} />
    </div>
  )}

  {location.pathname === "/seller-dashboard/products/bulk" && (
    <div>
      <BulkUploadCSV />
      <ProductList visible={visible} seller={true} />
    </div>
  )}

  {location.pathname === "/seller-dashboard/brands" && (
    <div>
      <Brands />
    </div>
  )}

  {location.pathname === "/seller-dashboard/view-all-users" && (
    <div>
      <ViewAllUsers />
    </div>
  )}

  {location.pathname === "/seller-dashboard/view-all-orders" && (
    <div>
      <ViewAllOrders />
    </div>
  )}
</main>

        </div>
      
    </div>
  )
  
}

export default NavbarDashboard