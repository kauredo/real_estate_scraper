import { useEffect } from "react";
import FullPageLoader from "@/components/ui/FullPageLoader";

const BackofficeRedirectPage = () => {
  useEffect(() => {
    const backofficeUrl =
      import.meta.env.VITE_BACKOFFICE_URL || "http://localhost:3102";
    window.location.href = backofficeUrl;
  }, []);

  return <FullPageLoader message="Redirecting to backoffice..." />;
};

export default BackofficeRedirectPage;
