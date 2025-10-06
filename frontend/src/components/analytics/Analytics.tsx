import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Get analytics IDs from environment variables
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || "";
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || "";

// Declare gtag and fbq on window
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    if (GA_TRACKING_ID) {
      // Add gtag script
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(gtagScript);

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_TRACKING_ID);
    }

    // Initialize Facebook Pixel
    if (FB_PIXEL_ID) {
      !(function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      window.fbq("init", FB_PIXEL_ID);
      window.fbq("track", "PageView");
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (GA_TRACKING_ID && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }

    if (FB_PIXEL_ID && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location]);

  // Add noscript fallback for Facebook Pixel
  useEffect(() => {
    if (FB_PIXEL_ID) {
      const noscript = document.createElement("noscript");
      const img = document.createElement("img");
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);

      return () => {
        document.body.removeChild(noscript);
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;
