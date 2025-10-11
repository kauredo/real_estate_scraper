"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Globe,
  Home,
  FileText,
  Star,
  Mail,
  Layout,
  BarChart3,
  Palette,
  Zap,
  Shield,
  Settings,
  CheckCircle2,
  ArrowRight,
  Image as ImageIcon,
  Users,
  Search,
  Smartphone,
} from "lucide-react";

export default function FeaturesPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">{t("common.siteTitle")}</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-900 font-medium">
                {t("nav.features")}
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {t("nav.pricing")}
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {t("nav.about")}
              </Link>
              <LanguageSwitcher />
              <Link href="/contact">
                <Button variant="default">{t("common.getStarted")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            {t("features.hero.badge")}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {t("features.hero.title")}
            <br />
            <span className="text-blue-600">
              {t("features.hero.titleHighlight")}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("features.hero.description")}
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.core.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("features.core.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>
                  {t("features.core.propertyListings.title")}
                </CardTitle>
                <CardDescription>
                  {t("features.core.propertyListings.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.propertyListings.features.unlimited")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.propertyListings.features.galleries")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.propertyListings.features.customDetails")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t(
                      "features.core.propertyListings.features.statusTracking",
                    )}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>{t("features.core.blogContent.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.blogContent.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.blogContent.features.editor")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.blogContent.features.images")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.blogContent.features.seo")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.blogContent.features.categories")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>{t("features.core.testimonials.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.testimonials.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.testimonials.features.display")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.testimonials.features.photos")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.testimonials.features.management")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.testimonials.features.featured")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>{t("features.core.newsletter.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.newsletter.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.newsletter.features.signup")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.newsletter.features.contact")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.newsletter.features.notifications")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.newsletter.features.export")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Layout className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>{t("features.core.dashboard.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.dashboard.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.dashboard.features.interface")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.dashboard.features.mobile")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.dashboard.features.realtime")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.dashboard.features.noTech")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>{t("features.core.analytics.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.analytics.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.analytics.features.tracking")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.analytics.features.listings")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.analytics.features.sources")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.analytics.features.metrics")}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {t("features.professional.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.professional.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("features.professional.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.modernDesign.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.professional.modernDesign.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.fast.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.professional.fast.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.secure.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.professional.secure.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Search className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.seo.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.professional.seo.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.mobile.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.professional.mobile.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Settings className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.custom.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.professional.custom.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {t("features.serviceOptions.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.serviceOptions.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("features.serviceOptions.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-gray-200">
              <CardContent className="pt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {t("features.serviceOptions.developer.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("features.serviceOptions.developer.description")}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("features.serviceOptions.developer.features.api")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t(
                        "features.serviceOptions.developer.features.backoffice",
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("features.serviceOptions.developer.features.frontend")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t(
                        "features.serviceOptions.developer.features.unlimited",
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("features.serviceOptions.developer.features.docs")}
                    </span>
                  </li>
                </ul>
                <Link href="/pricing" className="inline-block">
                  <Button size="lg" variant="outline" className="w-full">
                    {t("features.serviceOptions.developer.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="pt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {t("features.serviceOptions.professional.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("features.serviceOptions.professional.description")}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      <strong>
                        {t(
                          "features.serviceOptions.professional.features.custom",
                        )}
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t("features.serviceOptions.professional.features.api")}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t(
                        "features.serviceOptions.professional.features.domain",
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t(
                        "features.serviceOptions.professional.features.hosting",
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t(
                        "features.serviceOptions.professional.features.support",
                      )}
                    </span>
                  </li>
                </ul>
                <Link href="/pricing" className="inline-block">
                  <Button size="lg" className="w-full">
                    {t("features.serviceOptions.professional.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                {t("features.cta.heading")}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {t("features.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-6"
                  >
                    {t("common.scheduleDemo")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20"
                  >
                    {t("common.viewPricing")}
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
                <span className="font-bold">{t("common.siteTitle")}</span>
              </div>
              <p className="text-gray-600 text-sm">{t("common.tagline")}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("footer.product")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/features" className="hover:text-gray-900">
                    {t("nav.features")}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-gray-900">
                    {t("nav.pricing")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900">
                    {t("footer.demo")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-gray-900">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900">
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t("footer.resources")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="https://docs.myagentwebsite.com"
                    className="hover:text-gray-900"
                  >
                    {t("footer.documentation")}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@myagentwebsite.com"
                    className="hover:text-gray-900"
                  >
                    {t("footer.support")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
