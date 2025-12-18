/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Get analytics IDs from environment variables
const GA_TRACKING_ID = import.meta.env.VITE_GOOGLE_TAG_ID || "";
const FB_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID || "";

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
      window.gtag = function gtag(...args: any[]) {
        window.dataLayer.push({ ...args });
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_TRACKING_ID);
    }

    // Initialize Facebook Pixel
    if (FB_PIXEL_ID) {
      (function (
        f: Window,
        b: Document,
        e: string,
        v: string,
        n?: any,
        t?: HTMLScriptElement,
        s?: HTMLScriptElement,
      ) {
        if (f.fbq) return;
        n = f.fbq = function (...args: any[]) {
          if (n.callMethod) {
            n.callMethod(...args);
          } else {
            n.queue.push(args);
          }
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e) as HTMLScriptElement;
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0] as HTMLScriptElement;
        s.parentNode?.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
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
        if (document.body.contains(noscript)) {
          document.body.removeChild(noscript);
        }
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;
