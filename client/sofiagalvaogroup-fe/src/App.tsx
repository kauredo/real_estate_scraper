import "./stylesheets/application.tailwind.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { FlashMessageProvider } from "./contexts/FlashMessageContext";
import { ResourceProvider } from "./contexts/ResourceContext";
import Home from "./components/home/Home";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import About from "./components/staticPages/About";
import Contact from "./components/staticPages/Contact";
import House360 from "./components/staticPages/House360";
import KW from "./components/staticPages/KW";
import PrivacyPolicy from "./components/staticPages/PrivacyPolicy";
import Services from "./components/staticPages/Services";
import TermsAndConditions from "./components/staticPages/TermsAndConditions";
import NotFound from "./components/errorPages/404";
import Buy from "./components/listing/Buy";
import ListingShow from "./components/listing/ListingShow";
import Sell from "./components/listing/Sell";
import Enterprises from "./components/listingComplex/Enterprises";
import ListingComplexShow from "./components/listingComplex/ListingComplexShow";
import Blog from "./components/blog/Blog";
import BlogShow from "./components/blog/BlogShow";
import Login from "./components/admins/Login";
import BackofficeHome from "./components/backoffice/home/BackofficeHome";
import Flashes from "./components/shared/Flashes";
import BackofficeListings from "./components/backoffice/listings/BackofficeListings";
import EditListing from "./components/backoffice/listings/EditListing";
import BackofficeTestimonials from "./components/backoffice/testimonials/BackofficeTestimonials";
import EditTestimonial from "./components/backoffice/testimonials/EditTestimonial";
import NewTestimonial from "./components/backoffice/testimonials/NewTestimonial";
import BackofficeComplexes from "./components/backoffice/listingComplex/BackofficeComplexes";
import EditComplex from "./components/backoffice/listingComplex/EditComplex";
import NewComplex from "./components/backoffice/listingComplex/NewComplex";
import BackofficeBlog from "./components/backoffice/blog/BackofficeBlog";
import EditBlog from "./components/backoffice/blog/EditBlog";
import NewBlog from "./components/backoffice/blog/NewBlog";

export default function App() {
  const [isBackoffice, setIsBackoffice] = useState(false);
  const location = useLocation();

  const isAuthenticated = () => {
    // Check if there is a token in localStorage
    return !!localStorage.getItem("auth_token");
  };

  useEffect(() => {
    // Update isBackoffice based on the current URL
    setIsBackoffice(location.pathname.includes("backoffice"));
  }, [location]);

  return (
    <FlashMessageProvider>
      <ResourceProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route
              path="/:locale?"
              element={
                <Layout admin={isAuthenticated()} backoffice={isBackoffice}>
                  <Outlet />
                </Layout>
              }
            >
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="house_360" element={<House360 />} />
              <Route path="kw" element={<KW />} />
              <Route path="privacy_policy" element={<PrivacyPolicy />} />
              <Route path="services" element={<Services />} />
              <Route
                path="terms_and_conditions"
                element={<TermsAndConditions />}
              />
              <Route path="buy" element={<Buy />} />
              <Route path="buy/:slug" element={<ListingShow />} />
              <Route path="sell" element={<Sell />} />
              <Route path="latest" element={<Enterprises />} />
              <Route path="latest/:slug" element={<ListingComplexShow />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogShow />} />

              {/* BACKOFFICE */}
              <Route
                path="backoffice/*"
                element={
                  isAuthenticated() ? (
                    <Outlet />
                  ) : (
                    <Navigate to="/backoffice/login" replace />
                  )
                }
              >
                <Route index element={<BackofficeHome />} />
                <Route path="listings" element={<BackofficeListings />} />
                <Route path="listings/:slug/edit" element={<EditListing />} />
                <Route
                  path="testimonials"
                  element={<BackofficeTestimonials />}
                />
                <Route
                  path="testimonials/:slug/edit"
                  element={<EditTestimonial />}
                />
                <Route path="testimonials/new" element={<NewTestimonial />} />
                <Route
                  path="listing_complexes"
                  element={<BackofficeComplexes />}
                />
                <Route
                  path="listing_complexes/:slug/edit"
                  element={<EditComplex />}
                />
                <Route path="listing_complexes/new" element={<NewComplex />} />

                <Route path="blog_posts" element={<BackofficeBlog />} />
                <Route
                  path="blog_posts/:slug/edit"
                  element={<EditBlog />}
                />
                <Route path="blog_posts/new" element={<NewBlog />} />

                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route
              path="/backoffice/login"
              element={
                isAuthenticated() ? (
                  <Navigate to="/backoffice" replace />
                ) : (
                  <Layout>
                    <Login />
                  </Layout>
                )
              }
            />
          </Routes>
        </div>
      </ResourceProvider>
    </FlashMessageProvider>
  );
}

function Layout({ children, ...props }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Flashes />
      <Navbar {...props} />
      <div className="flex-auto">{children}</div>
      <Footer />
    </main>
  );
}
