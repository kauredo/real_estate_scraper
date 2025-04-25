import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
// import ListingComplexesPage from "./pages/ListingComplexesPage";
// import ListingComplexDetailPage from "./pages/ListingComplexDetailPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import SellPage from "./pages/SellPage";
import NotFoundPage from "./pages/NotFoundPage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white dark:bg-dark text-black dark:text-light">
        <Navbar />
        <div className="flex-auto">
          <Routes>
            {/* Portuguese Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/comprar" element={<ListingsPage />} />
            <Route path="/comprar/:slug" element={<ListingDetailPage />} />
            {/* <Route path="/empreendimentos" element={<ListingComplexesPage />} />
            <Route
              path="/empreendimentos/:slug"
              element={<ListingComplexDetailPage />}
            /> */}
            <Route path="/blog" element={<BlogPostsPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
            {/* <Route path="/vender" element={<SellPage />} />
            <Route path="/kw" element={<AboutPage />} />
            <Route path="/contactos" element={<ContactPage />} /> */}

            {/* English Routes */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/comprar" element={<ListingsPage />} />
            <Route path="/en/comprar/:slug" element={<ListingDetailPage />} />
            {/* <Route
              path="/en/empreendimentos"
              element={<ListingComplexesPage />}
            />
            <Route
              path="/en/empreendimentos/:slug"
              element={<ListingComplexDetailPage />}
            /> */}
            <Route path="/en/blog" element={<BlogPostsPage />} />
            <Route path="/en/blog/:slug" element={<BlogPostDetailPage />} />
            {/* <Route path="/en/vender" element={<SellPage />} />
            <Route path="/en/kw" element={<AboutPage />} />
            <Route path="/en/contactos" element={<ContactPage />} /> */}

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
