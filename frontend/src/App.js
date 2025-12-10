// src/App.js
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

// PUBLIC COMPONENTS
import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";
import ScrollToTop from './components/ScrollToTop';


// PUBLIC PAGES
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import FeaturesPage from "./pages/public/FeaturesPage";
import ContactPage from "./pages/public/ContactPage";
import FAQPage from "./pages/public/FAQPage";
import PrivacyPolicyPage from "./pages/public/PrivacyPolicyPage";
import TermsPage from "./pages/public/TermsPage";

// AUTH PAGES
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PendingApprovalPage from "./pages/auth/PendingApprovalPage";
import RegisterClosedPage from "./pages/auth/RegisterClosedPage";

// PROTECTED LAYOUT
import VendorLayout from "./layouts/VendorLayout";

// DASHBOARD PAGES
import DashboardPage from "./pages/dashboard/DashboardPage";
import OrdersPage from "./pages/orders/OrdersPage";
import ProductsPage from "./pages/products/ProductsPage";
import AddProductPage from "./pages/products/AddProductPage";
import EditProductPage from "./pages/products/EditProductPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProfilePage from "./pages/profile/ProfilePage";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboard";
import VendorApprovalsPage from "./pages/admin/VendorApprovalsPage";
import RiderApprovalsPage from "./pages/admin/RiderApprovalsPage";


const AdminProtectedRoute = ({ children }) => {
  const { vendor, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  // Accept vendor.role === 'admin' OR vendor.is_admin truthy
  if (!vendor || !(vendor.role === "admin" || vendor.is_admin)) {
    return <Navigate to="/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
};


function App() {
  const location = useLocation();
  const { vendor, loading } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!vendor) return <Navigate to="/login" replace />;
    return <VendorLayout>{children}</VendorLayout>;
  };

  return (
    <Routes location={location}>

      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          <>
            <PublicHeader />
            <HomePage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <PublicHeader />
            <AboutPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      <Route
        path="/features"
        element={
          <>
            <PublicHeader />
            <FeaturesPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      <Route
        path="/contact"
        element={
          <>
            <PublicHeader />
            <ContactPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      <Route
        path="/faq"
        element={
          <>
            <PublicHeader />
            <FAQPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      <Route
        path="/privacy-policy"
        element={
          <>
            <PublicHeader />
            <PrivacyPolicyPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      <Route
        path="/terms"
        element={
          <>
            <PublicHeader />
            <TermsPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      {/* INVITE-ONLY REGISTRATION PAGE */}
      <Route
        path="/register-closed"
        element={
          <>
            <PublicHeader />
            <RegisterClosedPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      {/* PENDING APPROVAL PAGE */}
      <Route
        path="/pending-approval"
        element={
          <>
            <PublicHeader />
            <PendingApprovalPage />
            <PublicFooter />
          </>
        }
      />

      {/* AUTH ROUTES */}
      <Route
        path="/login"
        element={
          <>
            <PublicHeader />
            <LoginPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      <Route
        path="/register"
        element={
          <>
            <PublicHeader />
            <RegisterPage />
            <PublicFooter />
            <ScrollToTop />
          </>
        }
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/add"
        element={
          <ProtectedRoute>
            <AddProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <EditProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/vendors"
        element={
          <AdminProtectedRoute>
            <VendorApprovalsPage />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/riders"
        element={
          <AdminProtectedRoute>
            <RiderApprovalsPage />
          </AdminProtectedRoute>
        }
      />


      {/* 404 PAGE */}
      <Route
        path="*"
        element={
          <>
            <PublicHeader />
            <div style={{ padding: "80px", textAlign: "center" }}>
              <h1>404 — Page Not Found</h1>
              <p>This page does not exist.</p>
            </div>
            <PublicFooter />
          </>
        }
      />

    </Routes>
  );
}

export default App;
