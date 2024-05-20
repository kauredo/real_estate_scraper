import "./stylesheets/application.tailwind.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { FlashMessageProvider } from "./contexts/FlashMessageContext";
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
