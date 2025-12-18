import { useEffect } from "react";
import FullPageLoader from "@/components/loading/FullPageLoader";

const BackofficeRedirectPage = () => {
  useEffect(() => {
    const backofficeUrl =
      import.meta.env.VITE_BACKOFFICE_URL || "http://localhost:3001";
    window.location.href = backofficeUrl;
  }, []);

  return <FullPageLoader message="Redirecting to backoffice..." />;
};

export default BackofficeRedirectPage;
