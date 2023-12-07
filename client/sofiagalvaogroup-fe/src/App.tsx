import "./stylesheets/application.tailwind.css.scss";
import Home from "./components/homePage/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/staticPages/About";
import Contact from "./components/staticPages/Contact";
import House360 from "./components/staticPages/House360";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="house_360" element={<House360 />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}

          {/* <Route path="*" element={<NoMatch />} /> */}
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
