import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <>
      <SEO page="terms" ogType="article" />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-gray-600">
            {t('terms.lastUpdated')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Agreement to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. {t('terms.agreement.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('terms.agreement.p1')}
            </p>
            <p className="text-gray-700">
              {t('terms.agreement.p2')}
            </p>
          </section>

          {/* Description of Service */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. {t('terms.description.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('terms.description.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('terms.description.features', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. {t('terms.account.title')}
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.1 {t('terms.account.requirements.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.account.requirements.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('terms.account.requirements.items', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3.2 {t('terms.account.security.title')}
            </h3>
            <p className="text-gray-700">
              {t('terms.account.security.content')}
            </p>
          </section>

          {/* Subscription Plans and Payment */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. {t('terms.payment.title')}
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4.1 {t('terms.payment.pricing.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.payment.pricing.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('terms.payment.pricing.plans', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-700 mb-4">
              {t('terms.payment.pricing.changes')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4.2 {t('terms.payment.terms.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.payment.terms.content')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4.3 {t('terms.payment.trial.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.payment.trial.content')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4.4 {t('terms.payment.refunds.title')}
            </h3>
            <p className="text-gray-700">
              {t('terms.payment.refunds.content')}
            </p>
          </section>

          {/* Cancellation and Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. {t('terms.cancellation.title')}
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5.1 {t('terms.cancellation.byUser.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.cancellation.byUser.content')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5.2 {t('terms.cancellation.byUs.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.cancellation.byUs.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('terms.cancellation.byUs.reasons', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5.3 {t('terms.cancellation.data.title')}
            </h3>
            <p className="text-gray-700">
              {t('terms.cancellation.data.content')}
            </p>
          </section>

          {/* User Content and Ownership */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. {t('terms.content.title')}
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6.1 {t('terms.content.yours.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.content.yours.content')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6.2 {t('terms.content.license.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.content.license.content')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6.3 {t('terms.content.responsibility.title')}
            </h3>
            <p className="text-gray-700">
              {t('terms.content.responsibility.content')}
            </p>
          </section>

          {/* Acceptable Use Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. {t('terms.acceptable.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('terms.acceptable.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              {(t('terms.acceptable.prohibitions', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. {t('terms.intellectual.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('terms.intellectual.p1')}
            </p>
            <p className="text-gray-700">
              {t('terms.intellectual.p2')}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. {t('terms.liability.title')}
            </h2>
            <p className="text-gray-700">
              {t('terms.liability.content')}
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. {t('terms.warranties.title')}
            </h2>
            <p className="text-gray-700">
              {t('terms.warranties.content')}
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. {t('terms.indemnification.title')}
            </h2>
            <p className="text-gray-700">
              {t('terms.indemnification.content')}
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. {t('terms.disputes.title')}
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              12.1 {t('terms.disputes.governing.title')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('terms.disputes.governing.content')}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              12.2 {t('terms.disputes.resolution.title')}
            </h3>
            <p className="text-gray-700">
              {t('terms.disputes.resolution.content')}
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. {t('terms.changes.title')}
            </h2>
            <p className="text-gray-700">
              {t('terms.changes.content')}
            </p>
          </section>

          {/* Severability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              14. {t('terms.severability.title')}
            </h2>
            <p className="text-gray-700">
              {t('terms.severability.content')}
            </p>
          </section>

          {/* Entire Agreement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              15. {t('terms.entire.title')}
            </h2>
            <p className="text-gray-700">
              {t('terms.entire.content')}
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              16. {t('terms.contact.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('terms.contact.intro')}
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>{t('terms.contact.email')}:</strong> legal@myagentwebsite.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>{t('terms.contact.website')}:</strong> https://myagentwebsite.com
              </p>
              <p className="text-gray-700">
                <strong>{t('terms.contact.address')}:</strong> {t('terms.contact.addressValue')}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
