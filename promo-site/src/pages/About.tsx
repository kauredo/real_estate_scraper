import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { SEO } from "../components/SEO";
import {
  Target,
  Users,
  Zap,
  Heart,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEO page="about" />
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            {t("about.hero.badge")}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {t("about.hero.title")}
            <br />
            <span className="text-primary-600">
              {t("about.hero.titleHighlight")}
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {t("about.hero.description")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {t("about.mission.badge")}
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                {t("about.mission.heading")}
              </h2>
              <p className="text-lg text-neutral-600 mb-4">
                {t("about.mission.paragraph1")}
              </p>
              <p className="text-lg text-neutral-600 mb-6">
                {t("about.mission.paragraph2")}
              </p>
              <Button asChild size="lg">
                <Link to="/contact">
                  {t("about.mission.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="border border-primary-200 bg-primary-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">
                        {t("about.mission.vision.title")}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {t("about.mission.vision.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-warm-200 bg-warm-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-warm-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-warm-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">
                        {t("about.mission.values.title")}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {t("about.mission.values.description")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("about.different.heading")}
            </h2>
            <p className="text-xl text-neutral-600">
              {t("about.different.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-8">
                <div className="mb-4 bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t("about.different.realEstate.title")}
                </h3>
                <p className="text-neutral-600">
                  {t("about.different.realEstate.description")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8">
                <div className="mb-4 bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t("about.different.modern.title")}
                </h3>
                <p className="text-neutral-600">
                  {t("about.different.modern.description")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8">
                <div className="mb-4 bg-warm-50 w-12 h-12 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-warm-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t("about.different.customerFirst.title")}
                </h3>
                <p className="text-neutral-600">
                  {t("about.different.customerFirst.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t("about.story.badge")}
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              {t("about.story.heading")}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600 mb-6">{t("about.story.paragraph1")}</p>

            <p className="text-neutral-600 mb-6">{t("about.story.paragraph2")}</p>

            <p className="text-neutral-600 mb-6">{t("about.story.paragraph3")}</p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block mb-1">
                    {t("about.story.benefits.fast.title")}
                  </strong>
                  <span className="text-neutral-600 text-sm">
                    {t("about.story.benefits.fast.description")}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block mb-1">
                    {t("about.story.benefits.easy.title")}
                  </strong>
                  <span className="text-neutral-600 text-sm">
                    {t("about.story.benefits.easy.description")}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block mb-1">
                    {t("about.story.benefits.affordable.title")}
                  </strong>
                  <span className="text-neutral-600 text-sm">
                    {t("about.story.benefits.affordable.description")}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block mb-1">
                    {t("about.story.benefits.professional.title")}
                  </strong>
                  <span className="text-neutral-600 text-sm">
                    {t("about.story.benefits.professional.description")}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-neutral-600 mb-6">{t("about.story.paragraph4")}</p>

            <p className="text-neutral-600">{t("about.story.paragraph5")}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-neutral-800 mb-2">
                {t("about.stats.launchTime.value")}
              </div>
              <p className="text-neutral-600">
                {t("about.stats.launchTime.label")}
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-neutral-800 mb-2">
                {t("about.stats.uptime.value")}
              </div>
              <p className="text-neutral-600">{t("about.stats.uptime.label")}</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-neutral-800 mb-2">
                {t("about.stats.support.value")}
              </div>
              <p className="text-neutral-600">{t("about.stats.support.label")}</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-neutral-800 mb-2">
                {t("about.stats.technical.value")}
              </div>
              <p className="text-neutral-600">
                {t("about.stats.technical.label")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-primary-600 border-0 text-white">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                {t("about.cta.heading")}
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                {t("about.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 bg-white text-primary-600 hover:bg-primary-50"
                >
                  <Link to="/contact">
                    {t("about.cta.primaryCta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/features">{t("about.cta.secondaryCta")}</Link>
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
