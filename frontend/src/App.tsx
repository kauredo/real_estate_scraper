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
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import FaqPage from "./pages/FaqPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPage from "./pages/PrivacyPage";
// import ClubPage from "./pages/ClubPage";
// import ListingComplexesPage from "./pages/ListingComplexesPage";
// import ListingComplexDetailPage from "./pages/ListingComplexDetailPage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
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
                  {/* <Route path="listing-complexes" element={<ListingComplexesPage />} /> */}
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Portuguese Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/comprar" element={<ListingsPage />} />
          <Route path="/comprar/:slug" element={<ListingDetailPage />} />
          {/* <Route path="/vender" element={<ListingsPage sellPage />} /> */}
          {/* <Route path="/empreendimentos" element={<ListingComplexesPage />} /> */}
          {/* <Route path="/empreendimentos/:slug" element={<ListingComplexDetailPage />} /> */}
          {/* <Route path="/club" element={<ClubPage />} /> */}
          <Route path="/blog" element={<BlogPostsPage />} />
          <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
          <Route path="/kw" element={<AboutPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/contactos" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/termos-e-condicoes"
            element={<TermsAndConditionsPage />}
          />
          <Route path="/privacidade" element={<PrivacyPage />} />

          {/* English Routes */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/buy" element={<ListingsPage />} />
          <Route path="/en/buy/:slug" element={<ListingDetailPage />} />
          {/* <Route path="/en/sell" element={<ListingsPage sellPage />} /> */}
          {/* <Route path="/en/enterprises" element={<ListingComplexesPage />} /> */}
          {/* <Route path="/en/enterprises/:slug" element={<ListingComplexDetailPage />} /> */}
          {/* <Route path="/en/club" element={<ClubPage />} /> */}
          <Route path="/en/blog" element={<BlogPostsPage />} />
          <Route path="/en/blog/:slug" element={<BlogPostDetailPage />} />
          <Route path="/en/kw" element={<AboutPage />} />
          <Route path="/en/services" element={<ServicesPage />} />
          <Route path="/en/contact" element={<ContactPage />} />
          <Route path="/en/faq" element={<FaqPage />} />
          <Route
            path="/en/terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
          <Route path="/en/privacy" element={<PrivacyPage />} />

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

  useEffect(() => {
    const currentLanguage = localStorage.getItem("language") || "pt";
    i18n.changeLanguage(currentLanguage);
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
