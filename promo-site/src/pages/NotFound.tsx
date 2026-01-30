import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const homeUrl = i18n.language === 'pt' ? '/pt' : '/';

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-sky-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t('notFound.title', 'Page not found')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t(
            'notFound.description',
            "Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist."
          )}
        </p>
        <Link
          to={homeUrl}
          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          {t('notFound.backHome', 'Back to home')}
        </Link>
      </div>
    </div>
  );
}
