import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
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
} from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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
              <Link to="/contact">
                <Button size="lg" className="text-lg px-8 py-6">
                  {t("common.scheduleDemo")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  {t("common.viewPricing")}
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-500 flex-wrap">
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

      {/* Case Study */}
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
                <div className="relative mb-8">
                  <Quote className="h-12 w-12 text-blue-600/20 absolute -top-4 -left-4" />
                  <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 pl-8">
                    &ldquo;{t("home.caseStudy.quote")}&rdquo;
                  </blockquote>
                </div>

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

                <div className="text-center">
                  <a
                    href="https://sofiagalvaogroup.com"
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
              <Link to="/features" className="inline-block mt-6">
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
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-6"
                  >
                    {t("common.scheduleDemo")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
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
    </div>
  );
}
