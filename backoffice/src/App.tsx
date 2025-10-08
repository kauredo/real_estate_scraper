import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";
import {
  NotificationProvider,
  useNotifications,
} from "./context/NotificationContext";
import { setNotificationContext } from "./services/api";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import NotificationToastContainer from "./components/shared/NotificationToast";
import LoginPage from "./pages/Auth/LoginPage";

// Admin Pages
import AdminBackofficePage from "./pages/Admin/AdminBackofficePage";
import AdminDashboard from "./pages/Admin/AdminDashboard";

// Blog Posts
import AdminBlogPostsPage from "./pages/Admin/AdminBlogPostsPage";
import AdminBlogPostNewPage from "./pages/Admin/AdminBlogPostNewPage";
import AdminBlogPostEditPage from "./pages/Admin/AdminBlogPostEditPage";
import AdminBlogPostDetailPage from "./pages/Admin/AdminBlogPostDetailPage";

// Club Stories
import AdminClubStoriesPage from "./pages/Admin/AdminClubStoriesPage";
import AdminClubStoryNewPage from "./pages/Admin/AdminClubStoryNewPage";
import AdminClubStoryEditPage from "./pages/Admin/AdminClubStoryEditPage";
import AdminClubStoryDetailPage from "./pages/Admin/AdminClubStoryDetailPage";

// Listings
import AdminListingsPage from "./pages/Admin/AdminListingsPage";
import AdminListingNewPage from "./pages/Admin/AdminListingNewPage";
import AdminListingEditPage from "./pages/Admin/AdminListingEditPage";
import AdminListingDetailPage from "./pages/Admin/AdminListingDetailPage";

// Listing Complexes
import AdminListingComplexesPage from "./pages/Admin/AdminListingComplexesPage";
import AdminListingComplexNewPage from "./pages/Admin/AdminListingComplexNewPage";
import AdminListingComplexEditPage from "./pages/Admin/AdminListingComplexEditPage";
import AdminListingComplexDetailPage from "./pages/Admin/AdminListingComplexDetailPage";

// Testimonials
import AdminTestimonialsPage from "./pages/Admin/AdminTestimonialsPage";
import AdminTestimonialNewPage from "./pages/Admin/AdminTestimonialNewPage";
import AdminTestimonialEditPage from "./pages/Admin/AdminTestimonialEditPage";
import AdminTestimonialDetailPage from "./pages/Admin/AdminTestimonialDetailPage";

// Variables
import AdminVariablesPage from "./pages/Admin/AdminVariablesPage";

// Newsletter
import AdminNewsletterSubscriptionsPage from "./pages/Admin/AdminNewsletterSubscriptionsPage";

// Club Users
import AdminClubUsersPage from "./pages/Admin/AdminClubUsersPage";

// Super Admin
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
  const { showError, showSuccess } = useNotifications();

  useEffect(() => {
    setNotificationContext({ showError, showSuccess });
  }, [showError, showSuccess]);

  return (
    <>
      <ScrollToTop />
      <NotificationToastContainer />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin/Backoffice Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Routes>
                <Route path="/" element={<AdminBackofficePage />} />
                <Route path="/dashboard" element={<AdminDashboard />} />

                {/* Blog Posts */}
                <Route path="/blog_posts" element={<AdminBlogPostsPage />} />
                <Route
                  path="/blog_posts/new"
                  element={<AdminBlogPostNewPage />}
                />
                <Route
                  path="/blog_posts/:id/edit"
                  element={<AdminBlogPostEditPage />}
                />
                <Route
                  path="/blog_posts/:id"
                  element={<AdminBlogPostDetailPage />}
                />

                {/* Club Stories */}
                <Route
                  path="/club_stories"
                  element={<AdminClubStoriesPage />}
                />
                <Route
                  path="/club_stories/new"
                  element={<AdminClubStoryNewPage />}
                />
                <Route
                  path="/club_stories/:id/edit"
                  element={<AdminClubStoryEditPage />}
                />
                <Route
                  path="/club_stories/:id"
                  element={<AdminClubStoryDetailPage />}
                />

                {/* Listings */}
                <Route path="/listings" element={<AdminListingsPage />} />
                <Route path="/listings/new" element={<AdminListingNewPage />} />
                <Route
                  path="/listings/:id/edit"
                  element={<AdminListingEditPage />}
                />
                <Route
                  path="/listings/:id"
                  element={<AdminListingDetailPage />}
                />

                {/* Listing Complexes */}
                <Route
                  path="/listing_complexes"
                  element={<AdminListingComplexesPage />}
                />
                <Route
                  path="/listing_complexes/new"
                  element={<AdminListingComplexNewPage />}
                />
                <Route
                  path="/listing_complexes/:id/edit"
                  element={<AdminListingComplexEditPage />}
                />
                <Route
                  path="/listing_complexes/:id"
                  element={<AdminListingComplexDetailPage />}
                />

                {/* Testimonials */}
                <Route
                  path="/testimonials"
                  element={<AdminTestimonialsPage />}
                />
                <Route
                  path="/testimonials/new"
                  element={<AdminTestimonialNewPage />}
                />
                <Route
                  path="/testimonials/:id/edit"
                  element={<AdminTestimonialEditPage />}
                />
                <Route
                  path="/testimonials/:id"
                  element={<AdminTestimonialDetailPage />}
                />

                {/* Variables */}
                <Route path="/variables" element={<AdminVariablesPage />} />

                {/* Newsletter */}
                <Route
                  path="/newsletter"
                  element={<AdminNewsletterSubscriptionsPage />}
                />

                {/* Club Users */}
                <Route path="/club_users" element={<AdminClubUsersPage />} />

                {/* Super Admin Routes */}
                <Route
                  path="/super_admin/admins"
                  element={
                    <SuperAdminRoute>
                      <SuperAdminAdminsPage />
                    </SuperAdminRoute>
                  }
                />
                <Route
                  path="/super_admin/tenants"
                  element={
                    <SuperAdminRoute>
                      <SuperAdminTenantsPage />
                    </SuperAdminRoute>
                  }
                />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TenantProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </TenantProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
