// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

// PUBLIC COMPONENTS
import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";

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

function App() {
  const { vendor, loading } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!vendor) return <Navigate to="/login" replace />;
    return <VendorLayout>{children}</VendorLayout>;
  };

  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          <>
            <PublicHeader />
            <HomePage />
            <PublicFooter />
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
