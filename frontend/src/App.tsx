import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  NotificationProvider,
  useNotifications,
} from "./context/NotificationContext";
import { setNotificationContext } from "./services/api";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NotificationToastContainer from "./components/shared/NotificationToast";
import Analytics from "./components/analytics/Analytics";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import ListingsSellPage from "./pages/ListingsSellPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import FaqPage from "./pages/FaqPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ClubPage from "./pages/ClubPage";
import ClubRulesPage from "./pages/ClubRulesPage";
import ClubStoriesPage from "./pages/ClubStoriesPage";
import ClubStoryDetailPage from "./pages/ClubStoryDetailPage";
import ListingComplexesPage from "./pages/ListingComplexesPage";
import ListingComplexDetailPage from "./pages/ListingComplexDetailPage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark text-black dark:text-light">
      <Navbar />
      <div className="flex-auto">
        <Routes>

          {/* Portuguese Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/comprar" element={<ListingsPage />} />
          <Route path="/comprar/:slug" element={<ListingDetailPage />} />
          <Route path="/vender" element={<ListingsSellPage />} />
          <Route path="/empreendimentos" element={<ListingComplexesPage />} />
          <Route
            path="/empreendimentos/:slug"
            element={<ListingComplexDetailPage />}
          />
          <Route path="/clube-sgg" element={<ClubPage />} />
          <Route path="/clube-sgg/regulamento" element={<ClubRulesPage />} />
          <Route path="/clube-sgg/historias" element={<ClubStoriesPage />} />
          <Route
            path="/clube-sgg/historias/:slug"
            element={<ClubStoryDetailPage />}
          />
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
          <Route path="/en/sell" element={<ListingsSellPage />} />
          <Route path="/en/enterprises" element={<ListingComplexesPage />} />
          <Route
            path="/en/enterprises/:slug"
            element={<ListingComplexDetailPage />}
          />
          <Route path="/en/club" element={<ClubPage />} />
          <Route path="/en/club/rules" element={<ClubRulesPage />} />
          <Route path="/en/club/stories" element={<ClubStoriesPage />} />
          <Route
            path="/en/club/stories/:slug"
            element={<ClubStoryDetailPage />}
          />
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
    <NotificationProvider>
      <BrowserRouter>
        <Analytics />
        <NotificationHandler />
        <ScrollToTop />
        <AppContent />
        <NotificationToastContainer />
      </BrowserRouter>
    </NotificationProvider>
  );
}

// Component to initialize the notification context for API calls
function NotificationHandler() {
  const { showError, showSuccess } = useNotifications();

  useEffect(() => {
    setNotificationContext({ showError, showSuccess });
  }, [showError, showSuccess]);

  return null;
}

export default App;
