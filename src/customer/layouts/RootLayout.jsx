import React from "react";
import { Outlet, useLocation, useMatch, matchPath } from "react-router-dom";
import Header from '../components/header/Header'
import MenuIcon from "../components/MenuIcon";
import LogoRun from "../components/logoSection/logoRun";

const RootLayout = () => {
  const location = useLocation();
  const categoryMatch = useMatch("/category/:slug");
  const activeCategory = categoryMatch?.params?.slug || null;

  const hideLogoRunRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/logout",
    "/payment/:orderId",
    "/User-profile"
  ];

  const shouldShowLogoRun = !hideLogoRunRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 items-center">
      {!matchPath("/payment/:orderId", location.pathname) && <Header />}


      {shouldShowLogoRun && <LogoRun />}
      {categoryMatch && <MenuIcon activeCategory={activeCategory} />}

      <main className="flex-1 w-full max-w-[1920px] mx-auto py-6 flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
