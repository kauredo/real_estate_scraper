"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  CheckCircle2,
  Zap,
  DollarSign,
  Globe,
  Sparkles,
  ArrowRight,
  BarChart3,
  Layout,
  Mail,
  Quote,
  ExternalLink,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">{t("common.siteTitle")}</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/features"
                className="text-gray-600 hover:text-gray-900 transition"
              >
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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              {t("home.hero.badge")}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {t("home.hero.title")}
              <br />
              <span className="text-blue-600">
                {t("home.hero.titleHighlight")}
              </span>
              <br />
              {t("home.hero.titleEnd")}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t("home.hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-8 py-6">
                  {t("common.scheduleDemo")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  {t("common.viewPricing")}
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {t("home.hero.benefit1")}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {t("home.hero.benefit2")}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {t("home.hero.benefit3")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-12 flex-wrap text-center max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {t("home.valueProposition.timeline")}
              </div>
              <p className="text-gray-600">
                {t("home.valueProposition.timelineDesc")}
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {t("home.valueProposition.tech")}
              </div>
              <p className="text-gray-600">
                {t("home.valueProposition.techDesc")}
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {t("home.valueProposition.service")}
              </div>
              <p className="text-gray-600">
                {t("home.valueProposition.serviceDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study - Sofia Galvão Group */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              {t("home.caseStudy.badge")}
            </Badge>
          </div>

          <Card className="border-0 shadow-2xl bg-white">
            <CardContent className="pt-12 pb-12">
              <div className="max-w-4xl mx-auto">
                {/* Quote */}
                <div className="relative mb-8">
                  <Quote className="h-12 w-12 text-blue-600/20 absolute -top-4 -left-4" />
                  <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 pl-8">
                    "{t("home.caseStudy.quote")}"
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mb-12 pl-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    SG
                  </div>
                  <div>
                    <div className="font-bold text-lg">
                      {t("home.caseStudy.author")}
                    </div>
                    <div className="text-gray-600">
                      {t("home.caseStudy.role")}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {t("home.caseStudy.stats.stat1.value")}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {t("home.caseStudy.stats.stat1.label")}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {t("home.caseStudy.stats.stat2.value")}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {t("home.caseStudy.stats.stat2.label")}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {t("home.caseStudy.stats.stat3.value")}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {t("home.caseStudy.stats.stat3.label")}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a
                    href="https://sofiagalvao.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg">
                      {t("home.caseStudy.cta")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("home.benefits.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("home.benefits.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-blue-600 transition">
              <CardContent className="pt-6">
                <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("home.benefits.professional.title")}
                </h3>
                <p className="text-gray-600">
                  {t("home.benefits.professional.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-600 transition">
              <CardContent className="pt-6">
                <div className="mb-4 bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("home.benefits.flexible.title")}
                </h3>
                <p className="text-gray-600">
                  {t("home.benefits.flexible.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-600 transition">
              <CardContent className="pt-6">
                <div className="mb-4 bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Layout className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("home.benefits.modern.title")}
                </h3>
                <p className="text-gray-600">
                  {t("home.benefits.modern.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-600 transition">
              <CardContent className="pt-6">
                <div className="mb-4 bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t("home.benefits.brand.title")}
                </h3>
                <p className="text-gray-600">
                  {t("home.benefits.brand.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Layout className="h-3 w-3 mr-1" />
              {t("home.showcase.badge")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("home.showcase.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("home.showcase.subheading")}
            </p>
          </div>

          <div className="space-y-16">
            {/* Dashboard Preview */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-2xl p-1">
                  <div className="bg-gray-900 rounded-lg p-4">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 bg-gray-800 rounded px-3 py-1 text-xs text-gray-400">
                        backoffice.myagentwebsite.com
                      </div>
                    </div>
                    {/* Dashboard mockup */}
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-20 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-8 w-8 text-white" />
                        </div>
                        <div className="w-20 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Layout className="h-8 w-8 text-white" />
                        </div>
                        <div className="w-20 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Mail className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-800 rounded-lg p-3 h-20"></div>
                        <div className="bg-gray-800 rounded-lg p-3 h-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">
                  {t("home.showcase.dashboard.title")}
                </h3>
                <p className="text-lg text-gray-600">
                  {t("home.showcase.dashboard.description")}
                </p>
              </div>
            </div>

            {/* Agent Website Preview */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  {t("home.showcase.website.title")}
                </h3>
                <p className="text-lg text-gray-600">
                  {t("home.showcase.website.description")}
                </p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-2xl p-1">
                  <div className="bg-white rounded-lg overflow-hidden">
                    {/* Website mockup */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                      <div className="h-3 w-32 bg-white/30 rounded mb-4"></div>
                      <div className="h-8 w-48 bg-white/40 rounded mb-2"></div>
                      <div className="h-4 w-40 bg-white/30 rounded"></div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded"></div>
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded"></div>
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Experience */}
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">
                {t("home.showcase.mobile.title")}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {t("home.showcase.mobile.description")}
              </p>
              <div className="flex justify-center gap-8">
                {/* Mobile mockup */}
                <div className="relative">
                  <div className="w-64 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                    <div className="bg-white rounded-2xl overflow-hidden h-[500px]">
                      {/* Mobile content */}
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                        <div className="h-2 w-24 bg-white/30 rounded mb-3"></div>
                        <div className="h-6 w-32 bg-white/40 rounded mb-1"></div>
                        <div className="h-3 w-28 bg-white/30 rounded"></div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-200 rounded w-full"></div>
                          <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-16 bg-gray-100 rounded"></div>
                          <div className="h-16 bg-gray-100 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {t("home.features.badge")}
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                {t("home.features.heading")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t("home.features.listings.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("home.features.listings.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t("home.features.blog.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("home.features.blog.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t("home.features.testimonials.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("home.features.testimonials.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t("home.features.newsletter.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("home.features.newsletter.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t("home.features.domain.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("home.features.domain.description")}
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/features" className="inline-block mt-6">
                <Button variant="outline">
                  {t("home.features.viewAllFeatures")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Layout className="h-5 w-5" />
                      <span className="font-semibold">Admin Dashboard</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Manage everything from one place
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-5 w-5" />
                      <span className="font-semibold">Lead Capture</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Never miss an opportunity
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-semibold">Analytics</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Track your performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                {t("home.cta.heading")}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {t("home.cta.description")}
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
