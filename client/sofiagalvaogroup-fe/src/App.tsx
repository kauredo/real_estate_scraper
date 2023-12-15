import "./stylesheets/application.tailwind.css.scss";
import Home from "./components/homePage/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/staticPages/About";
import Contact from "./components/staticPages/Contact";
import House360 from "./components/staticPages/House360";
import KW from "./components/staticPages/KW";
import PrivacyPolicy from "./components/staticPages/PrivacyPolicy";
import Services from "./components/staticPages/Services";
import TermsAndConditions from "./components/staticPages/TermsAndConditions";
import NotFound from "./components/errorPages/404";
import Buy from "./components/pages/Buy";
import Sell from "./components/pages/Sell";
import Enterprises from "./components/pages/Enterprises";
import Blog from "./components/pages/Blog";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="house_360" element={<House360 />} />
          <Route path="kw" element={<KW />} />
          <Route path="privacy_policy" element={<PrivacyPolicy />} />
          <Route path="services" element={<Services />} />
          <Route path="terms_and_conditions" element={<TermsAndConditions />} />
          <Route path="buy" element={<Buy />} />
          <Route path="sell" element={<Sell />} />
          <Route path="latest" element={<Enterprises />} />
          <Route path="blog" element={<Blog />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
