import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-gray-600">
            {t('privacy.lastUpdated')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. {t('privacy.intro.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.intro.p1')}
            </p>
            <p className="text-gray-700">
              {t('privacy.intro.p2')}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. {t('privacy.collection.title')}
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.1 {t('privacy.collection.personal.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('privacy.collection.personal.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.collection.personal.items', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-700 mb-4">
              {t('privacy.collection.personal.types')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.collection.personal.typesList', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.2 {t('privacy.collection.automatic.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('privacy.collection.automatic.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.collection.automatic.items', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. {t('privacy.usage.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.usage.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.usage.items', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. {t('privacy.cookies.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.cookies.intro')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4.1 {t('privacy.cookies.types.title')}
            </h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.cookies.types.items', { returnObjects: true }) as Array<{name: string, desc: string}>).map((item, idx) => (
                <li key={idx}><strong>{item.name}:</strong> {item.desc}</li>
              ))}
            </ul>

            <p className="text-gray-700 mb-4">
              {t('privacy.cookies.control')}
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. {t('privacy.thirdParty.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.thirdParty.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.thirdParty.services', { returnObjects: true }) as Array<{name: string, purpose: string}>).map((item, idx) => (
                <li key={idx}><strong>{item.name}:</strong> {item.purpose}</li>
              ))}
            </ul>
            <p className="text-gray-700">
              {t('privacy.thirdParty.note')}
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. {t('privacy.security.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.security.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.security.measures', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-700">
              {t('privacy.security.disclaimer')}
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. {t('privacy.retention.title')}
            </h2>
            <p className="text-gray-700">
              {t('privacy.retention.content')}
            </p>
          </section>

          {/* Your Rights (GDPR) */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. {t('privacy.rights.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.rights.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('privacy.rights.items', { returnObjects: true }) as Array<{name: string, desc: string}>).map((item, idx) => (
                <li key={idx}><strong>{item.name}:</strong> {item.desc}</li>
              ))}
            </ul>
            <p className="text-gray-700">
              {t('privacy.rights.exercise')}
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. {t('privacy.children.title')}
            </h2>
            <p className="text-gray-700">
              {t('privacy.children.content')}
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. {t('privacy.international.title')}
            </h2>
            <p className="text-gray-700">
              {t('privacy.international.content')}
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. {t('privacy.changes.title')}
            </h2>
            <p className="text-gray-700">
              {t('privacy.changes.content')}
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. {t('privacy.contact.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.contact.intro')}
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>{t('privacy.contact.email')}:</strong> privacy@myagentwebsite.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>{t('privacy.contact.website')}:</strong> https://myagentwebsite.com
              </p>
              <p className="text-gray-700">
                <strong>{t('privacy.contact.address')}:</strong> {t('privacy.contact.addressValue')}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
