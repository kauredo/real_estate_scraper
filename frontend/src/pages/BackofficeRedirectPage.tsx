import { useEffect } from "react";

const BackofficeRedirectPage = () => {
  useEffect(() => {
    const backofficeUrl =
      import.meta.env.VITE_BACKOFFICE_URL || "http://localhost:3001";
    window.location.href = backofficeUrl;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-beige-default mx-auto mb-4"></div>
        <p className="text-lg text-black dark:text-light">
          Redirecting to backoffice...
        </p>
      </div>
    </div>
  );
};

export default BackofficeRedirectPage;
