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
  Search,
  Smartphone,
  Building2,
  Image,
  Eye,
} from "lucide-react";

export default function Features() {
  const { t } = useTranslation();

  return (
    <>
      <SEO page="features" />
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            {t("features.hero.badge")}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {t("features.hero.title")}
            <br />
            <span className="text-primary-600">
              {t("features.hero.titleHighlight")}
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
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
            <p className="text-xl text-neutral-600">
              {t("features.core.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="mb-4 bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>
                  {t("features.core.propertyListings.title")}
                </CardTitle>
                <CardDescription>
                  {t("features.core.propertyListings.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-600">
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
                      "features.core.propertyListings.features.statusTracking"
                    )}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-warm-50 w-12 h-12 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-warm-600" />
                </div>
                <CardTitle>{t("features.core.blogContent.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.blogContent.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-600">
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
                <ul className="space-y-2 text-sm text-neutral-600">
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
                <ul className="space-y-2 text-sm text-neutral-600">
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
                <ul className="space-y-2 text-sm text-neutral-600">
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
                <ul className="space-y-2 text-sm text-neutral-600">
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

            <Card>
              <CardHeader>
                <div className="mb-4 bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>{t("features.core.developments.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.developments.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.developments.features.multiProperty")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.developments.features.showcase")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.developments.features.units")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.developments.features.dedicated")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Image className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>{t("features.core.photoManagement.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.photoManagement.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.photoManagement.features.library")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.photoManagement.features.reusable")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.photoManagement.features.organized")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.photoManagement.features.professional")}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-cyan-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle>{t("features.core.previewMode.title")}</CardTitle>
                <CardDescription>
                  {t("features.core.previewMode.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.previewMode.features.beforePublish")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.previewMode.features.qualityControl")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.previewMode.features.clientApproval")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {t("features.core.previewMode.features.secure")}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Interface Showcase */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {t("features.adminInterface.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.adminInterface.heading")}
            </h2>
            <p className="text-xl text-neutral-600">
              {t("features.adminInterface.subheading")}
            </p>
          </div>

          <div className="space-y-20">
            {/* Dashboard Screenshot */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50">
                    <BarChart3 className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {t("features.adminInterface.dashboard.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.adminInterface.dashboard.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.dashboard.features.metrics")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.dashboard.features.quickAccess")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.dashboard.features.mobile")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/images/admin-dashboard.webp"
                    alt="MyAgentWebsite Admin Dashboard Interface"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 hidden items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Layout className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Dashboard Screenshot</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/admin-dashboard.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Editor Screenshot */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-2">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-warm-50">
                    <FileText className="h-6 w-6 text-warm-600" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {t("features.adminInterface.blogEditor.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.adminInterface.blogEditor.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.blogEditor.features.wysiwyg")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.blogEditor.features.seo")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.blogEditor.features.preview")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-1">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/images/admin-blog-edit.webp"
                    alt="MyAgentWebsite Blog Editor Interface"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 hidden items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <FileText className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Blog Editor Screenshot</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/admin-blog-edit.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Management Screenshot - PLACEHOLDER */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <Home className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {t("features.adminInterface.propertyManagement.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.adminInterface.propertyManagement.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.propertyManagement.features.bulkActions")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.propertyManagement.features.filters")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.adminInterface.propertyManagement.features.import")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* TODO: Add admin property management detailed view screenshot */}
                  <img
                    src="/images/admin-property-management.webp"
                    alt="MyAgentWebsite Property Management Interface"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 flex items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Home className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Property Management Screenshot</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/admin-property-management.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <p className="text-xl text-neutral-600">
              {t("features.professional.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Palette className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.modernDesign.title")}
                </h3>
                <p className="text-neutral-600">
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
                <p className="text-neutral-600">
                  {t("features.professional.fast.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-warm-50 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-warm-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {t("features.professional.secure.title")}
                </h3>
                <p className="text-neutral-600">
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
                <p className="text-neutral-600">
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
                <p className="text-neutral-600">
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
                <p className="text-neutral-600">
                  {t("features.professional.custom.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Examples */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {t("features.liveExamples.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.liveExamples.heading")}
            </h2>
            <p className="text-xl text-neutral-600">
              {t("features.liveExamples.subheading")}
            </p>
          </div>

          <div className="space-y-20">
            {/* Example Website 1 - About Page */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  <Badge className="bg-primary-600 text-white mb-2">
                    {t("features.liveExamples.example1.badge")}
                  </Badge>
                  <h3 className="text-3xl font-bold">
                    {t("features.liveExamples.example1.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.liveExamples.example1.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example1.features.design")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example1.features.responsive")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example1.features.seo")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/images/sofia-galvao-about.webp"
                    alt="Sofia Galvão Group - About Page Example"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 hidden items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Layout className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Website Example Screenshot</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/sofia-galvao-about.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Website 2 - Homepage */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-2">
                <div className="space-y-4">
                  <Badge className="bg-warm-500 text-white mb-2">
                    {t("features.liveExamples.example2.badge")}
                  </Badge>
                  <h3 className="text-3xl font-bold">
                    {t("features.liveExamples.example2.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.liveExamples.example2.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example2.features.hero")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example2.features.content")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example2.features.cta")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-1">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/images/sofia-galvao-website.webp"
                    alt="Sofia Galvão Group - Homepage Content Example"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 hidden items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Layout className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Website Content Screenshot</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/sofia-galvao-website.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Website 3 - PLACEHOLDER for additional client */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  <Badge className="bg-green-600 text-white mb-2">
                    {t("features.liveExamples.example3.badge")}
                  </Badge>
                  <h3 className="text-3xl font-bold">
                    {t("features.liveExamples.example3.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.liveExamples.example3.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example3.features.feature1")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example3.features.feature2")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.liveExamples.example3.features.feature3")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* TODO: Add additional client website screenshot */}
                  <img
                    src="/images/example-website-3.webp"
                    alt="Client Website Example"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 flex items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Layout className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Additional Client Example</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/example-website-3.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Showcase */}
      <section className="py-20 px-4 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {t("features.advancedFeatures.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.advancedFeatures.heading")}
            </h2>
            <p className="text-xl text-neutral-600">
              {t("features.advancedFeatures.subheading")}
            </p>
          </div>

          <div className="space-y-20">
            {/* Property Developments Showcase */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal-100">
                    <Building2 className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {t("features.advancedFeatures.developments.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.advancedFeatures.developments.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.developments.features.showcase")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.developments.features.management")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.developments.features.units")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* TODO: Add development detail page screenshot */}
                  <img
                    src="/images/development-detail-page.webp"
                    alt="Property Development Detail Page"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 flex items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Building2 className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Development Detail Page</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/development-detail-page.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Management Showcase */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-2">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-pink-100">
                    <Image className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {t("features.advancedFeatures.photoManagement.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.advancedFeatures.photoManagement.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.photoManagement.features.library")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.photoManagement.features.reusable")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.photoManagement.features.organized")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-1">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* TODO: Add photo library management screenshot */}
                  <img
                    src="/images/admin-photo-library.webp"
                    alt="Photo Library Management Interface"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 flex items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Image className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Photo Library Interface</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/admin-photo-library.webp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Management Showcase */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    {t("features.advancedFeatures.newsletter.title")}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {t("features.advancedFeatures.newsletter.description")}
                  </p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.newsletter.features.management")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.newsletter.features.export")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        {t("features.advancedFeatures.newsletter.features.integration")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* TODO: Add newsletter subscribers with export screenshot */}
                  <img
                    src="/images/admin-newsletter-export.webp"
                    alt="Newsletter Subscribers Management with Export"
                    className="w-full h-auto"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="aspect-[16/10] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 flex items-center justify-center">
                    <div className="text-center text-neutral-600 p-8">
                      <Mail className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold opacity-75">Newsletter Management</p>
                      <p className="text-sm opacity-50 mt-2">/public/images/admin-newsletter-export.webp</p>
                    </div>
                  </div>
                </div>
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
            <p className="text-xl text-neutral-600">
              {t("features.serviceOptions.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-neutral-200">
              <CardContent className="pt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {t("features.serviceOptions.developer.title")}
                  </h3>
                  <p className="text-neutral-600">
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
                        "features.serviceOptions.developer.features.backoffice"
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
                        "features.serviceOptions.developer.features.unlimited"
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
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link to="/pricing">
                    {t("features.serviceOptions.developer.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary-200 bg-primary-50/30">
              <CardContent className="pt-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {t("features.serviceOptions.professional.title")}
                  </h3>
                  <p className="text-neutral-600">
                    {t("features.serviceOptions.professional.description")}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      <strong>
                        {t(
                          "features.serviceOptions.professional.features.custom"
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
                        "features.serviceOptions.professional.features.domain"
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t(
                        "features.serviceOptions.professional.features.hosting"
                      )}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>
                      {t(
                        "features.serviceOptions.professional.features.support"
                      )}
                    </span>
                  </li>
                </ul>
                <Button asChild size="lg" className="w-full">
                  <Link to="/pricing">
                    {t("features.serviceOptions.professional.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-primary-600 border-0 text-white">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                {t("features.cta.heading")}
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                {t("features.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 bg-white text-primary-600 hover:bg-primary-50"
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
                  className="text-lg px-8 py-6 bg-transparent border-white/30 text-white hover:bg-white/10"
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
