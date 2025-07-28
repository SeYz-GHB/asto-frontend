import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { useAuthStore } from "./auth/authStore";

// 🔹 Auth Pages
import LoginPage from "./auth/page/LoginPage";
import SignupPage from "./auth/page/SignupPage";
import ForgotPswPage from "./auth/page/ForgotPswPage";
import EmailVerificationPage from "./auth/page/EmailVerificationPage";
import LogoutPage from "./auth/page/LogoutPage";
import ResetPasswrod from "./auth/page/ResetPasswrod";
import UserProfilePage from "./auth/page/UserProfilePage";

// 🔹 Customer Pages
import RootLayout from "./customer/layouts/RootLayout";
import Homepage from "./customer/pages/Homepage";
import ProductDetail from "./customer/pages/ProductDetail";
import Checkout from "./customer/pages/Checkout";
import ProductCategoryByBrand from "./customer/pages/ProductCategoryByBrand";
import QRPayment from "./customer/components/checkoutSection/QRPayment";

// 🔹 Seller/Admin Pages
import RootSellerLayout from "./seller/Layout/RootSellerLayout";
import ProductList from "./seller/components/Product_Management/ProductList";
import AddNewProducts from "./seller/components/Product_Management/AddNewProduct";
import BulkUploadCSV from "./seller/components/Product_Management/BulkUploadCSV";
import Brands from "./seller/components/brand_Management/Brands";
import ViewAllUsers from "./seller/components/ViewAllUsers";
import ViewAllOrders from "./seller/components/ViewAllOrders";

// ✅ Protected route (only checks authentication)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log(" ProtectedRoute check →", { isAuthenticated, user });

  if (!isAuthenticated) {
    console.log(" User not authenticated → redirecting to /login");
    return <Navigate to="/login" replace />;
  }
  if (!user?.is_verified) {
    console.log(" User not verified → redirecting to /verify-email");
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log("🔍 RedirectAuthenticatedUser →", { isAuthenticated, user });

  if (isAuthenticated && user?.is_verified) {
    console.log("ℹ Already logged in → redirecting to /");
    return <Navigate to="/" replace />;
  }
  return children;
};


const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log(" RoleProtectedRoute check →", {
    isAuthenticated,
    user,
    allowedRoles,
  });

  if (!isAuthenticated) {
    console.log(" Not logged in → redirecting to /login");
    return <Navigate to="/login" replace />;
  }
  if (!user?.is_verified) {
    console.log(" Not verified → redirecting to /verify-email");
    return <Navigate to="/verify-email" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    console.log(
      ` Role '${user.role}' is not allowed (Allowed: ${allowedRoles.join(", ")}) → redirecting to /`
    );
    return <Navigate to="/" replace />;
  }

  console.log("✅ Role authorized → rendering child");
  return children;
};

// ✅ Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 🏠 Public + Customer Routes */}
      <Route path="/" element={<RootLayout />}>
        <Route
          path="login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="signup" element={<SignupPage />} />
        <Route path="reset-password" element={<ResetPasswrod />} />
        <Route path="forgot-password" element={<ForgotPswPage />} />
        <Route path="verify-email" element={<EmailVerificationPage />} />
        <Route path="logout" element={<LogoutPage />} />

        <Route index element={<Homepage />} />
        <Route path="category/:slug" element={<ProductCategoryByBrand />} />
        <Route path="product/:category/:slugId" element={<ProductDetail />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="user-profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="payment/:orderId" element={<QRPayment />} />
      </Route>

      {/* 📦 Seller/Admin Dashboard */}
      <Route
        path="/seller-dashboard/*"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "seller"]}>
            <RootSellerLayout />
          </RoleProtectedRoute>
        }
      >
        {/* Seller Pages */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<AddNewProducts />} />
        <Route path="products/bulk" element={<BulkUploadCSV />} />
        <Route path="view-all-orders" element={<ViewAllOrders />} />

        {/* Admin-only Pages */}
        <Route
          path="brands"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Brands />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="view-all-users"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <ViewAllUsers />
            </RoleProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    console.log("🔄 Running checkAuth()...");
    checkAuth();
  }, []);

  console.log("📌 App Render State →", {
    isCheckingAuth,
    isAuthenticated,
    user,
  });

  if (isCheckingAuth) {
    console.log(" Checking authentication...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin mr-2" size={20} />
        <span className="text-lg">Loading...</span>
      </div>
    );
  }



  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
