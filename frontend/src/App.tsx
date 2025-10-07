import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {
  NotificationProvider,
  useNotifications,
} from "./context/NotificationContext";
import { setNotificationContext } from "./services/api";
import ProtectedRoute from "./components/ProtectedRoute";
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
import LoginPage from "./pages/Auth/LoginPage";
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
import AdminBlogPostsPage from "./pages/Admin/AdminBlogPostsPage";
import AdminBlogPostNewPage from "./pages/Admin/AdminBlogPostNewPage";
import AdminBlogPostEditPage from "./pages/Admin/AdminBlogPostEditPage";
import AdminBlogPostDetailPage from "./pages/Admin/AdminBlogPostDetailPage";
import AdminBackofficePage from "./pages/Admin/AdminBackofficePage";
import AdminClubStoriesPage from "./pages/Admin/AdminClubStoriesPage";
import AdminClubStoryEditPage from "./pages/Admin/AdminClubStoryEditPage";
import AdminClubStoryDetailPage from "./pages/Admin/AdminClubStoryDetailPage";
import AdminClubStoryNewPage from "./pages/Admin/AdminClubStoryNewPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminListingsPage from "./pages/Admin/AdminListingsPage";
import AdminListingNewPage from "./pages/Admin/AdminListingNewPage";
import AdminListingEditPage from "./pages/Admin/AdminListingEditPage";
import AdminListingDetailPage from "./pages/Admin/AdminListingDetailPage";
import AdminListingComplexesPage from "./pages/Admin/AdminListingComplexesPage";
import AdminListingComplexNewPage from "./pages/Admin/AdminListingComplexNewPage";
import AdminListingComplexEditPage from "./pages/Admin/AdminListingComplexEditPage";
import AdminListingComplexDetailPage from "./pages/Admin/AdminListingComplexDetailPage";
import AdminTestimonialsPage from "./pages/Admin/AdminTestimonialsPage";
import AdminTestimonialNewPage from "./pages/Admin/AdminTestimonialNewPage";
import AdminTestimonialEditPage from "./pages/Admin/AdminTestimonialEditPage";
import AdminTestimonialDetailPage from "./pages/Admin/AdminTestimonialDetailPage";
import SuperAdminAdminsPage from "./pages/Admin/SuperAdmin/SuperAdminAdminsPage";
import SuperAdminTenantsPage from "./pages/Admin/SuperAdmin/SuperAdminTenantsPage";
import SuperAdminRoute from "./components/SuperAdminRoute";

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
                  {/* Home */}
                  <Route path="" element={<AdminBackofficePage />} />

                  {/* Dashboard */}
                  <Route path="dashboard" element={<AdminDashboard />} />

                  {/* Blog Posts */}
                  <Route path="blog_posts" element={<AdminBlogPostsPage />} />
                  <Route
                    path="blog_posts/new"
                    element={<AdminBlogPostNewPage />}
                  />
                  <Route
                    path="blog_posts/:id/edit"
                    element={<AdminBlogPostEditPage />}
                  />
                  <Route
                    path="blog_posts/:id"
                    element={<AdminBlogPostDetailPage />}
                  />

                  {/* Club Stories */}
                  <Route
                    path="club_stories"
                    element={<AdminClubStoriesPage />}
                  />
                  <Route
                    path="club_stories/new"
                    element={<AdminClubStoryNewPage />}
                  />
                  <Route
                    path="club_stories/:id/edit"
                    element={<AdminClubStoryEditPage />}
                  />
                  <Route
                    path="club_stories/:id"
                    element={<AdminClubStoryDetailPage />}
                  />

                  {/* Listings */}
                  <Route path="listings" element={<AdminListingsPage />} />
                  <Route
                    path="listings/new"
                    element={<AdminListingNewPage />}
                  />
                  <Route
                    path="listings/:id/edit"
                    element={<AdminListingEditPage />}
                  />
                  <Route
                    path="listings/:id"
                    element={<AdminListingDetailPage />}
                  />

                  {/* Listing Complexes */}
                  <Route
                    path="listing_complexes"
                    element={<AdminListingComplexesPage />}
                  />
                  <Route
                    path="listing_complexes/new"
                    element={<AdminListingComplexNewPage />}
                  />
                  <Route
                    path="listing_complexes/:id/edit"
                    element={<AdminListingComplexEditPage />}
                  />
                  <Route
                    path="listing_complexes/:id"
                    element={<AdminListingComplexDetailPage />}
                  />

                  {/* Testimonials */}
                  <Route
                    path="testimonials"
                    element={<AdminTestimonialsPage />}
                  />
                  <Route
                    path="testimonials/new"
                    element={<AdminTestimonialNewPage />}
                  />
                  <Route
                    path="testimonials/:id/edit"
                    element={<AdminTestimonialEditPage />}
                  />
                  <Route
                    path="testimonials/:id"
                    element={<AdminTestimonialDetailPage />}
                  />

                  {/* Super Admin Routes */}
                  <Route
                    path="super_admin/admins"
                    element={
                      <SuperAdminRoute>
                        <SuperAdminAdminsPage />
                      </SuperAdminRoute>
                    }
                  />
                  <Route
                    path="super_admin/tenants"
                    element={
                      <SuperAdminRoute>
                        <SuperAdminTenantsPage />
                      </SuperAdminRoute>
                    }
                  />
                </Routes>
              </ProtectedRoute>
            }
          />

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
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Analytics />
          <NotificationHandler />
          <ScrollToTop />
          <AppContent />
          <NotificationToastContainer />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
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
