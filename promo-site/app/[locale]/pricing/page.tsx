"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Crown,
  Building2
} from "lucide-react";

export default function PricingPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">{t('common.siteTitle')}</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition">
                {t('nav.features')}
              </Link>
              <Link href="/pricing" className="text-gray-900 font-medium">
                {t('nav.pricing')}
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">
                {t('nav.about')}
              </Link>
              <LanguageSwitcher />
              <Link href="/contact">
                <Button variant="default">{t('common.getStarted')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            {t('pricing.hero.badge')}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {t('pricing.hero.title')}
            <br />
            <span className="text-blue-600">{t('pricing.hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('pricing.hero.description')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Developer Plan */}
            <Card className="border-2 hover:border-gray-300 transition">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-gray-600" />
                  <CardTitle>{t('pricing.plans.developer.name')}</CardTitle>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{t('pricing.plans.developer.price')}</span>
                  <span className="text-gray-600">{t('pricing.plans.developer.priceUnit')}</span>
                </div>
                <CardDescription>
                  {t('pricing.plans.developer.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <Button variant="outline" className="w-full mb-6">
                    {t('pricing.plans.developer.cta')}
                  </Button>
                </Link>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.developer.features.apiAccess')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.developer.features.ownFrontend')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.developer.features.listings')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.developer.features.content')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.developer.features.multiTenant')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.developer.features.docs')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.developer.features.support')}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
                    {t('pricing.plans.developer.setupFee')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Plan - Most Popular */}
            <Card className="border-2 border-blue-600 relative shadow-xl scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  <Crown className="h-3 w-3 mr-1" />
                  {t('pricing.plans.professional.badge')}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-blue-600" />
                  <CardTitle>{t('pricing.plans.professional.name')}</CardTitle>
                </div>
                <div className="mb-4">
                  <span className="text-lg text-gray-600">{t('pricing.plans.professional.priceLabel')}</span>
                  <br />
                  <span className="text-4xl font-bold">{t('pricing.plans.professional.price')}</span>
                  <span className="text-gray-600">{t('pricing.plans.professional.priceUnit')}</span>
                </div>
                <CardDescription>
                  {t('pricing.plans.professional.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <Button className="w-full mb-6 bg-blue-600 hover:bg-blue-700">
                    {t('pricing.plans.professional.cta')}
                  </Button>
                </Link>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>{t('pricing.plans.professional.features.custom')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.professional.features.apiAccess')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.professional.features.unlimited')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.professional.features.domain')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.professional.features.maintenance')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.professional.features.support')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.professional.features.setup')}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
                    {t('pricing.plans.professional.setupFee')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 hover:border-gray-300 transition">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-gray-600" />
                  <CardTitle>{t('pricing.plans.enterprise.name')}</CardTitle>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{t('pricing.plans.enterprise.price')}</span>
                </div>
                <CardDescription>
                  {t('pricing.plans.enterprise.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <Button variant="outline" className="w-full mb-6">
                    {t('pricing.plans.enterprise.cta')}
                  </Button>
                </Link>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>{t('pricing.plans.enterprise.features.everything')}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.enterprise.features.multiple')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.enterprise.features.whiteLabel')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.enterprise.features.dedicated')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.enterprise.features.integrations')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.enterprise.features.priority')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t('pricing.plans.enterprise.features.sla')}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
                    {t('pricing.plans.enterprise.setupFee')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('pricing.comparison.heading')}</h2>
            <p className="text-xl text-gray-600">
              {t('pricing.comparison.description')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">{t('pricing.plans.developer.name')}</th>
                  <th className="text-center py-4 px-4 font-semibold bg-blue-50">{t('pricing.plans.professional.name')}</th>
                  <th className="text-center py-4 px-4 font-semibold">{t('pricing.plans.enterprise.name')}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.customWebsite')}</td>
                  <td className="text-center py-4 px-4 text-gray-400">{t('pricing.comparison.values.buildYourOwn')}</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.apiAccess')}</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.backoffice')}</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.listings')}</td>
                  <td className="text-center py-4 px-4">{t('pricing.comparison.values.unlimited')}</td>
                  <td className="text-center py-4 px-4 bg-blue-50">{t('pricing.comparison.values.unlimited')}</td>
                  <td className="text-center py-4 px-4">{t('pricing.comparison.values.unlimited')}</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.blog')}</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.domain')}</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.hosting')}</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.setupFee')}</td>
                  <td className="text-center py-4 px-4">{t('pricing.comparison.values.none')}</td>
                  <td className="text-center py-4 px-4 bg-blue-50">€2,500</td>
                  <td className="text-center py-4 px-4">{t('pricing.comparison.values.custom')}</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.multiple')}</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50">-</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.whiteLabel')}</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50">-</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">{t('pricing.comparison.features.dedicated')}</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4 bg-blue-50">-</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('pricing.faq.heading')}</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pricing.faq.questions.launch.question')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('pricing.faq.questions.launch.answer')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pricing.faq.questions.setupFee.question')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('pricing.faq.questions.setupFee.answer')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pricing.faq.questions.switch.question')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('pricing.faq.questions.switch.answer')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pricing.faq.questions.payment.question')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('pricing.faq.questions.payment.answer')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pricing.faq.questions.ownership.question')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('pricing.faq.questions.ownership.answer')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pricing.faq.questions.cancel.question')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('pricing.faq.questions.cancel.answer')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                {t('pricing.cta.heading')}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {t('pricing.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                    {t('common.scheduleDemo')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20">
                    {t('common.viewFeatures')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="font-bold">{t('common.siteTitle')}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {t('common.tagline')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/features" className="hover:text-gray-900">{t('nav.features')}</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-900">{t('nav.pricing')}</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">{t('footer.demo')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-gray-900">{t('nav.about')}</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">{t('nav.contact')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.resources')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="https://docs.myagentwebsite.com" className="hover:text-gray-900">{t('footer.documentation')}</a></li>
                <li><a href="mailto:support@myagentwebsite.com" className="hover:text-gray-900">{t('footer.support')}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
