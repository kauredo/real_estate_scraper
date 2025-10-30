import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CookieConsent } from "./components/CookieConsent";
import { LocalizedRouter } from "./components/LocalizedRouter";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CaseStudies from "./pages/CaseStudies";
import Help from "./pages/Help";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LocalizedRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* English routes (no prefix) */}
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/help" element={<Help />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Portuguese routes (/pt prefix) */}
              <Route path="/pt" element={<Home />} />
              <Route path="/pt/features" element={<Features />} />
              <Route path="/pt/pricing" element={<Pricing />} />
              <Route path="/pt/about" element={<About />} />
              <Route path="/pt/contact" element={<Contact />} />
              <Route path="/pt/case-studies" element={<CaseStudies />} />
              <Route path="/pt/help" element={<Help />} />
              <Route path="/pt/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/pt/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </LocalizedRouter>
    </BrowserRouter>
  );
}

export default App;
