import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { SEO } from "../components/SEO";
import { useLocalizedPath } from "../hooks/useLocalizedPath";
import {
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
  Quote,
} from "lucide-react";

export default function CaseStudies() {
  const { t } = useTranslation();
  const localizedPath = useLocalizedPath();

  return (
    <>
      <SEO page="caseStudies" />
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("caseStudies.hero.badge")}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {t("caseStudies.hero.title")}
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              {t("caseStudies.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <Badge variant="default" className="mb-4">
                {t("caseStudies.featured.label")}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: Client Info */}
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  {t("caseStudies.featured.client")}
                </h2>
                <div className="text-neutral-600 mb-6">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">
                      {t("caseStudies.featured.location")}
                    </span>
                  </p>
                  <p className="text-sm">
                    {t("caseStudies.featured.type")}
                  </p>
                </div>

                {/* Challenge */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    {t("caseStudies.featured.challenge.title")}
                  </h3>
                  <p className="text-neutral-600">
                    {t("caseStudies.featured.challenge.description")}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    {t("caseStudies.featured.solution.title")}
                  </h3>
                  <p className="text-neutral-600">
                    {t("caseStudies.featured.solution.description")}
                  </p>
                </div>

                {/* Visit Website */}
                <a
                  href="https://sofiagalvaogroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {t("caseStudies.featured.visitWebsite")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Right: Results */}
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  {t("caseStudies.featured.results.title")}
                </h3>

                <div className="space-y-4 mb-8">
                  {/* Result 1 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-50 rounded-lg">
                          <Clock className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-primary-600 mb-1">
                            {t("caseStudies.featured.results.metrics.0.value")}
                          </div>
                          <div className="font-semibold mb-1">
                            {t("caseStudies.featured.results.metrics.0.label")}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {t("caseStudies.featured.results.metrics.0.description")}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Result 2 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-green-600 mb-1">
                            {t("caseStudies.featured.results.metrics.1.value")}
                          </div>
                          <div className="font-semibold mb-1">
                            {t("caseStudies.featured.results.metrics.1.label")}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {t("caseStudies.featured.results.metrics.1.description")}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Result 3 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-warm-50 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-warm-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-warm-600 mb-1">
                            {t("caseStudies.featured.results.metrics.2.value")}
                          </div>
                          <div className="font-semibold mb-1">
                            {t("caseStudies.featured.results.metrics.2.label")}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {t("caseStudies.featured.results.metrics.2.description")}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quote */}
                <Card className="bg-primary-50/50 border-primary-200">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary-600 mb-4" />
                    <p className="text-neutral-700 italic mb-4">
                      "{t("caseStudies.featured.quote")}"
                    </p>
                    <div>
                      <div className="font-semibold">
                        {t("caseStudies.featured.quoteName")}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {t("caseStudies.featured.quoteRole")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* More Stories Coming Soon */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t("caseStudies.moreStories.title")}
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              {t("caseStudies.moreStories.subtitle")}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>More success stories coming soon</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t("caseStudies.cta.title")}
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              {t("caseStudies.cta.subtitle")}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              <Link to={localizedPath("/contact")}>
                {t("caseStudies.cta.button")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
