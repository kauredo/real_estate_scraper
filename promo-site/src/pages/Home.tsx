import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { SEO } from "../components/SEO";
import {
  CheckCircle2,
  Zap,
  DollarSign,
  Sparkles,
  ArrowRight,
  BarChart3,
  Layout,
  Mail,
  Quote,
  ExternalLink,
  TrendingUp,
  FileText,
  Home as HomeIcon,
} from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SEO page="home" />
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {t("home.hero.badge")}
                </Badge>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900">
                  {t("home.hero.title")}
                  <br />
                  <span className="text-primary-600">
                    {t("home.hero.titleHighlight")}
                  </span>
                  <br />
                  {t("home.hero.titleEnd")}
                </h1>

                <p className="text-xl md:text-2xl text-neutral-600">
                  {t("home.hero.description")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-8 py-6 w-full sm:w-auto"
                  >
                    <Link to="/contact">
                      {t("common.scheduleDemo")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 w-full sm:w-auto"
                  >
                    <Link to="/pricing">{t("common.viewPricing")}</Link>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700">
                      {t("home.hero.benefit1")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700">
                      {t("home.hero.benefit2")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-neutral-700">
                      {t("home.hero.benefit3")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Hero Image */}
              <div className="relative">
                {/*
                TODO: Replace placeholder image
                Location: /public/images/hero-platform-screenshot.webp
                Instructions: /public/images/placeholders/hero-platform-screenshot.md
              */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src="/images/hero-platform-screenshot.webp"
                    alt="MyAgentWebsite Platform - Real Estate Agent Website Example"
                    className="w-full h-auto aspect-[4/3] object-cover"
                    onError={e => {
                      // Fallback to gradient if image not found
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[4/3] bg-neutral-100 hidden items-center justify-center">
                    <div className="text-center text-neutral-400 p-8">
                      <Layout className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">
                        Add platform screenshot
                      </p>
                      <p className="text-sm opacity-50 mt-2">
                        /public/images/hero-platform-screenshot.webp
                      </p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-200 rounded-full opacity-40 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-100 rounded-full opacity-40 blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-12 bg-white border-y border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center gap-12 flex-wrap text-center max-w-4xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-neutral-800 mb-1">
                  {t("home.valueProposition.timeline")}
                </div>
                <p className="text-neutral-600">
                  {t("home.valueProposition.timelineDesc")}
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-neutral-800 mb-1">
                  {t("home.valueProposition.tech")}
                </div>
                <p className="text-neutral-600">
                  {t("home.valueProposition.techDesc")}
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-neutral-800 mb-1">
                  {t("home.valueProposition.service")}
                </div>
                <p className="text-neutral-600">
                  {t("home.valueProposition.serviceDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-20 px-4 bg-neutral-50">
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
                  {/*
                  TODO: Replace placeholder image
                  Location: /public/images/sofia-galvao-website.webp
                  Instructions: /public/images/placeholders/sofia-galvao-website.md
                */}
                  <div className="mb-8 rounded-xl overflow-hidden border-4 border-gray-100">
                    <img
                      src="/images/sofia-galvao-listings.webp"
                      alt="Sofia Galvão Group - Real Estate Website built with MyAgentWebsite"
                      className="w-full h-auto aspect-[16/9] object-cover"
                      onError={e => {
                        // Fallback to gradient if image not found
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center">
                      <div className="text-center text-gray-400 p-8">
                        <Layout className="h-16 w-16 mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-semibold">
                          Add Sofia Galvão Group website screenshot
                        </p>
                        <p className="text-xs opacity-75 mt-1">
                          /public/images/sofia-galvao-website.webp
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-8">
                    <Quote className="h-12 w-12 text-warm-300 absolute -top-4 -left-4" />
                    <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 pl-8">
                      &ldquo;{t("home.caseStudy.quote")}&rdquo;
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4 mb-12 pl-8">
                    {/* TODO: Replace with actual photo */}
                    <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center text-warm-700 font-bold text-xl border-2 border-warm-200">
                      SG
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {t("home.caseStudy.author")}
                      </div>
                      <div className="text-neutral-600">
                        {t("home.caseStudy.role")}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-white rounded-xl border border-neutral-200">
                      <div className="text-4xl font-bold text-neutral-800 mb-2">
                        {t("home.caseStudy.stats.stat1.value")}
                      </div>
                      <p className="text-neutral-600 text-sm">
                        {t("home.caseStudy.stats.stat1.label")}
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl border border-neutral-200">
                      <div className="text-4xl font-bold text-neutral-800 mb-2">
                        {t("home.caseStudy.stats.stat2.value")}
                      </div>
                      <p className="text-neutral-600 text-sm">
                        {t("home.caseStudy.stats.stat2.label")}
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl border border-neutral-200">
                      <div className="text-4xl font-bold text-neutral-800 mb-2">
                        {t("home.caseStudy.stats.stat3.value")}
                      </div>
                      <p className="text-neutral-600 text-sm">
                        {t("home.caseStudy.stats.stat3.label")}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button asChild variant="outline" size="lg">
                      <a
                        href="https://sofiagalvaogroup.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("home.caseStudy.cta")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
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
              <p className="text-xl text-neutral-600">
                {t("home.benefits.subheading")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-800">
                    {t("home.benefits.professional.title")}
                  </h3>
                  <p className="text-neutral-600">
                    {t("home.benefits.professional.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-800">
                    {t("home.benefits.flexible.title")}
                  </h3>
                  <p className="text-neutral-600">
                    {t("home.benefits.flexible.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-warm-50 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Layout className="h-6 w-6 text-warm-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-800">
                    {t("home.benefits.modern.title")}
                  </h3>
                  <p className="text-neutral-600">
                    {t("home.benefits.modern.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-neutral-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-neutral-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-800">
                    {t("home.benefits.brand.title")}
                  </h3>
                  <p className="text-neutral-600">
                    {t("home.benefits.brand.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Features / Admin Interface */}
        <section className="py-20 px-4 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Layout className="h-3 w-3 mr-1" />
                {t("home.platformFeatures.badge")}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("home.platformFeatures.heading")}
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {t("home.platformFeatures.subheading")}
              </p>
            </div>

            <div className="space-y-16">
              {/* Dashboard */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50">
                      <BarChart3 className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-3xl font-bold">
                      {t("home.platformFeatures.dashboard.title")}
                    </h3>
                    <p className="text-lg text-neutral-600">
                      {t("home.platformFeatures.dashboard.description")}
                    </p>
                    <ul className="space-y-3 pt-4">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Real-time metrics and statistics
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Quick actions for common tasks
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Clean, intuitive interface
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/images/admin-dashboard.webp"
                      alt="MyAgentWebsite Admin Dashboard"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Blog Editor */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/images/admin-blog-edit.webp"
                      alt="MyAgentWebsite Blog Editor"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-warm-50">
                      <FileText className="h-6 w-6 text-warm-600" />
                    </div>
                    <h3 className="text-3xl font-bold">
                      {t("home.platformFeatures.blog.title")}
                    </h3>
                    <p className="text-lg text-neutral-600">
                      {t("home.platformFeatures.blog.description")}
                    </p>
                    <ul className="space-y-3 pt-4">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Rich text editor with formatting
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          SEO meta tags and descriptions
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Image uploads and galleries
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Property Listings */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50">
                      <HomeIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold">
                      {t("home.platformFeatures.listings.title")}
                    </h3>
                    <p className="text-lg text-neutral-600">
                      {t("home.platformFeatures.listings.description")}
                    </p>
                    <ul className="space-y-3 pt-4">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Import from third-party platforms
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Bulk edit and manage properties
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-neutral-700">
                          Status tracking (Active/Sold/Pending)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/images/admin-listings.webp"
                      alt="Property Listings Page Example"
                      className="w-full h-auto"
                    />
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
                      <p className="text-neutral-600">
                        {t("home.features.listings.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">
                        {t("home.features.developments.title")}
                      </h3>
                      <p className="text-neutral-600">
                        {t("home.features.developments.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">
                        {t("home.features.blog.title")}
                      </h3>
                      <p className="text-neutral-600">
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
                      <p className="text-neutral-600">
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
                      <p className="text-neutral-600">
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
                      <p className="text-neutral-600">
                        {t("home.features.domain.description")}
                      </p>
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/features">
                    {t("home.features.viewAllFeatures")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <div className="bg-neutral-50 rounded-2xl p-8 shadow-xl border border-neutral-200">
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Layout className="h-5 w-5 text-primary-600" />
                        <span className="font-semibold text-neutral-900">Admin Dashboard</span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Manage everything from one place
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-5 w-5 text-warm-600" />
                        <span className="font-semibold text-neutral-900">Lead Capture</span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Never miss an opportunity
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-neutral-900">Analytics</span>
                      </div>
                      <p className="text-sm text-neutral-600">
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
            <Card className="bg-primary-600 border-0 text-white">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-4xl font-bold mb-4">
                  {t("home.cta.heading")}
                </h2>
                <p className="text-xl text-primary-100 mb-8">
                  {t("home.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-8 bg-white text-primary-600 hover:bg-primary-50"
                  >
                    <Link to="/contact">
                      {t("common.scheduleDemo")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    <Link to="/pricing">{t("common.viewPricing")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
