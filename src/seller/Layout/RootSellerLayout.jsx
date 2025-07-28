import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDashboard from '../components/Dashboard'
import Header from '../components/Header'

const RootSellerLayout = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50">
      
      {/* Optional: Add shared header/footer here if needed */}

      <main className="w-full max-w-[1920px] flex-grow">
        <Header setVisible= {setVisible} />
        <NavbarDashboard visible = {visible} />
        
        
        
      </main>
    </div>
  );
};

export default RootSellerLayout;
