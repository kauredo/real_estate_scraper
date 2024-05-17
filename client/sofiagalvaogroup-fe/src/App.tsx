import "./stylesheets/application.tailwind.scss";
import Home from "./components/home/Home";
import { Routes, Route, Outlet } from "react-router-dom";
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

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/:locale?" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="house_360" element={<House360 />} />
          <Route path="kw" element={<KW />} />
          <Route path="privacy_policy" element={<PrivacyPolicy />} />
          <Route path="services" element={<Services />} />
          <Route path="terms_and_conditions" element={<TermsAndConditions />} />
          <Route path="buy" element={<Buy />} />
          <Route path="buy/:slug" element={<ListingShow />} />
          <Route path="sell" element={<Sell />} />
          <Route path="latest" element={<Enterprises />} />
          <Route path="latest/:slug" element={<ListingComplexShow />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogShow />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* BACKOFFICE */}

        <Route path="/backoffice" element={<Layout />}>
          {/* <Route index element={<BackofficeHome />} /> */}
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
