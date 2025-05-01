import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage";
import LoginPage from "./pages/Auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Wrapper component to handle navbar props based on auth state and location
function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isBackoffice =
    location.pathname.startsWith("/backoffice") ||
    location.pathname.startsWith("/en/backoffice");

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark text-black dark:text-light">
      <Navbar
        admin={isAuthenticated}
        backoffice={isAuthenticated && isBackoffice}
      />
      <div className="flex-auto">
        <Routes>
          {/* Auth Routes */}
          <Route path="/backoffice/login" element={<LoginPage />} />

          {/* Backoffice Protected Routes */}
          <Route
            path="/backoffice/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="listings" element={<ListingsPage />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Portuguese Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/comprar" element={<ListingsPage />} />
          <Route path="/comprar/:slug" element={<ListingDetailPage />} />
          <Route path="/blog" element={<BlogPostsPage />} />
          <Route path="/blog/:slug" element={<BlogPostDetailPage />} />

          {/* English Routes */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/comprar" element={<ListingsPage />} />
          <Route path="/en/comprar/:slug" element={<ListingDetailPage />} />
          <Route path="/en/blog" element={<BlogPostsPage />} />
          <Route path="/en/blog/:slug" element={<BlogPostDetailPage />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  // Initialize language from URL or localStorage
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/en")) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("pt");
    }
  }, [i18n]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
