import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumbs' | 'softwareApplication';
  customData?: Record<string, unknown>;
}

const SITE_URL = 'https://myagentwebsite.com';
const SITE_NAME = 'MyAgentWebsite';

/**
 * StructuredData component for adding JSON-LD structured data to promo-site pages
 * Provides Organization, WebSite, BreadcrumbList, and SoftwareApplication schemas
 */
export function StructuredData({ type, customData }: StructuredDataProps) {
  const location = useLocation();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const schema = generateSchema(type, location.pathname, i18n.language, t, customData);
    if (schema) {
      injectStructuredData(schema, type);
    }

    return () => {
      // Cleanup on unmount
      const scriptId = `structured-data-${type}`;
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, location.pathname, i18n.language, t, customData]);

  return null;
}

function generateSchema(
  type: string,
  pathname: string,
  language: string,
  t: (key: string) => string,
  customData?: Record<string, unknown>
): Record<string, unknown> | null {
  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo-512.png`,
          width: 512,
          height: 512,
        },
        description: t('seo.home.description'),
        sameAs: [
          // Add social media URLs when available
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: `${SITE_URL}/contact`,
          availableLanguage: ['English', 'Portuguese'],
        },
      };

    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: t('seo.home.description'),
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: language === 'pt' ? 'pt-PT' : 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/help?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      };

    case 'softwareApplication':
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t('seo.home.description'),
        url: SITE_URL,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '0',
          offerCount: '3',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: customData?.rating
          ? {
              '@type': 'AggregateRating',
              ratingValue: customData.rating,
              ratingCount: customData.ratingCount,
            }
          : undefined,
        screenshot: `${SITE_URL}/screenshots/dashboard.png`,
        featureList: [
          'Property listing management',
          'Lead capture forms',
          'Mobile-optimized design',
          'SEO tools',
          'Multi-language support',
        ],
      };

    case 'breadcrumbs':
      return generateBreadcrumbs(pathname, language, t);

    default:
      return null;
  }
}

function generateBreadcrumbs(
  pathname: string,
  language: string,
  t: (key: string) => string
): Record<string, unknown> {
  const basePath = pathname.replace(/^\/(en|pt)(\/|$)/, '/');
  const langPrefix = language === 'pt' ? '/pt' : '';

  const breadcrumbItems: Array<{ name: string; url: string }> = [
    { name: t('nav.home') || 'Home', url: SITE_URL + langPrefix },
  ];

  // Map paths to breadcrumb names
  const pathMap: Record<string, string> = {
    '/features': t('nav.features') || 'Features',
    '/pricing': t('nav.pricing') || 'Pricing',
    '/about': t('nav.about') || 'About',
    '/contact': t('nav.contact') || 'Contact',
    '/case-studies': t('nav.caseStudies') || 'Case Studies',
    '/help': t('nav.help') || 'Help',
    '/privacy-policy': t('footer.privacy') || 'Privacy Policy',
    '/terms-of-service': t('footer.terms') || 'Terms of Service',
  };

  if (basePath !== '/' && pathMap[basePath]) {
    breadcrumbItems.push({
      name: pathMap[basePath],
      url: `${SITE_URL}${langPrefix}${basePath}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function injectStructuredData(data: Record<string, unknown>, type: string) {
  const scriptId = `structured-data-${type}`;
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  // Clean undefined values
  const cleanData = JSON.parse(JSON.stringify(data));
  script.textContent = JSON.stringify(cleanData);
}

export default StructuredData;
