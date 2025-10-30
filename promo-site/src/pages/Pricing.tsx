import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SEO } from "../components/SEO";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Building2,
  Crown,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <SEO page="pricing" />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            {t("pricing.hero.badge")}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {t("pricing.hero.title")}
            <br />
            <span className="text-blue-600">
              {t("pricing.hero.titleHighlight")}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("pricing.hero.description")}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Developer Plan */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="mb-4 bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-2xl">
                  {t("pricing.plans.developer.name")}
                </CardTitle>
                <CardDescription>
                  {t("pricing.plans.developer.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {t("pricing.plans.developer.price")}
                  </div>
                  <p className="text-gray-600">
                    {t("pricing.plans.developer.billing")}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{t("pricing.plans.developer.features.api")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.developer.features.backoffice")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.developer.features.frontend")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{t("pricing.plans.developer.features.docs")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.developer.features.unlimited")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    <span className="text-gray-400">
                      {t("pricing.plans.developer.features.hosting")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    <span className="text-gray-400">
                      {t("pricing.plans.developer.features.support")}
                    </span>
                  </li>
                </ul>
                <Link to="/contact" className="inline-block w-full">
                  <Button size="lg" variant="outline" className="w-full">
                    {t("pricing.plans.developer.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan - Most Popular */}
            <Card className="border-2 border-blue-600 relative shadow-xl scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">
                  {t("pricing.plans.professional.badge")}
                </Badge>
              </div>
              <CardHeader>
                <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">
                  {t("pricing.plans.professional.name")}
                </CardTitle>
                <CardDescription>
                  {t("pricing.plans.professional.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {t("pricing.plans.professional.priceFrom")}
                  </div>
                  <p className="text-gray-600">
                    {t("pricing.plans.professional.billing")}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.professional.features.custom")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.professional.features.api")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.professional.features.domain")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.professional.features.hosting")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.professional.features.support")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.professional.features.updates")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.professional.features.maintenance")}
                    </span>
                  </li>
                </ul>
                <Link to="/contact" className="inline-block w-full">
                  <Button size="lg" className="w-full">
                    {t("pricing.plans.professional.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <div className="mb-4 bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">
                  {t("pricing.plans.enterprise.name")}
                </CardTitle>
                <CardDescription>
                  {t("pricing.plans.enterprise.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {t("pricing.plans.enterprise.price")}
                  </div>
                  <p className="text-gray-600">
                    {t("pricing.plans.enterprise.billing")}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.enterprise.features.everything")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.enterprise.features.dedicated")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{t("pricing.plans.enterprise.features.sla")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.enterprise.features.training")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.enterprise.features.whitelabel")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.enterprise.features.integrations")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("pricing.plans.enterprise.features.priority")}
                    </span>
                  </li>
                </ul>
                <Link to="/contact" className="inline-block w-full">
                  <Button size="lg" variant="outline" className="w-full">
                    {t("pricing.plans.enterprise.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("pricing.comparison.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("pricing.comparison.subheading")}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold">
                    {t("pricing.comparison.table.feature")}
                  </th>
                  <th className="text-center py-4 px-4 font-bold">
                    {t("pricing.plans.developer.name")}
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-blue-600">
                    {t("pricing.plans.professional.name")}
                  </th>
                  <th className="text-center py-4 px-4 font-bold">
                    {t("pricing.plans.enterprise.name")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.api")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.backoffice")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.frontend")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.customDomain")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.hosting")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.support")}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600 text-sm">
                    {t("pricing.comparison.table.support.community")}
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50 text-gray-600 text-sm">
                    {t("pricing.comparison.table.support.email")}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600 text-sm">
                    {t("pricing.comparison.table.support.dedicated")}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.updates")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.customizations")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.whitelabel")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    {t("pricing.comparison.table.rows.sla")}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center bg-blue-50">
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="h-5 w-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("pricing.faq.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("pricing.faq.subheading")}
            </p>
          </div>

          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Card key={index} className="border-2 border-gray-200">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-bold text-lg">
                      {t(`pricing.faq.questions.${index}.question`)}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">
                        {t(`pricing.faq.questions.${index}.answer`)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                {t("pricing.cta.heading")}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {t("pricing.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-6"
                  >
                    {t("pricing.cta.primaryCta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20"
                  >
                    {t("pricing.cta.secondaryCta")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
}
