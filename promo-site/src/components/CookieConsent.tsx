import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { X } from 'lucide-react';

export function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Here you could also enable analytics/tracking
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    // Here you could disable analytics/tracking
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg animate-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1 text-sm text-gray-700">
            <p className="mb-2">
              <strong>{t('cookies.title')}</strong>
            </p>
            <p>
              {t('cookies.description')}{' '}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                {t('cookies.privacyLink')}
              </Link>.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="whitespace-nowrap"
            >
              {t('cookies.decline')}
            </Button>
            <Button
              onClick={handleAccept}
              className="whitespace-nowrap"
            >
              {t('cookies.accept')}
            </Button>
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={handleDecline}
            className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label={t('cookies.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
