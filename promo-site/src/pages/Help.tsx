import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { SEO } from "../components/SEO";
import { useLocalizedPath } from "../hooks/useLocalizedPath";
import {
  BookOpen,
  Mail,
  MessageCircle,
  FileText,
  CreditCard,
  Palette,
  ExternalLink,
} from "lucide-react";

export default function Help() {
  const { t } = useTranslation();
  const localizedPath = useLocalizedPath();

  const categoryIcons = [BookOpen, FileText, Palette, CreditCard];

  return (
    <>
      <SEO page="help" />
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("help.hero.badge")}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {t("help.hero.title")}
            </h1>
            <p className="text-xl text-neutral-600">
              {t("help.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-primary-600 text-white border-0">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-3">
                      {t("help.documentation.title")}
                    </h2>
                    <p className="text-primary-100 text-lg mb-6">
                      {t("help.documentation.description")}
                    </p>
                    <a
                      href={t("help.documentation.url")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="bg-white text-primary-600 hover:bg-primary-50"
                      >
                        {t("help.documentation.button")}
                        <ExternalLink className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("help.categories.title")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((index) => {
                const Icon = categoryIcons[index];
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-50 rounded-lg">
                          <Icon className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">
                            {t(`help.categories.items.${index}.title`)}
                          </h3>
                          <p className="text-neutral-600">
                            {t(`help.categories.items.${index}.description`)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">
                {t("help.support.title")}
              </h2>
              <p className="text-xl text-neutral-600">
                {t("help.support.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Support */}
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-primary-50 rounded-full mb-4">
                    <Mail className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("help.support.email.title")}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {t("help.support.email.description")}
                  </p>
                  <a
                    href={`mailto:${t("help.support.email.contact")}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    {t("help.support.email.contact")}
                  </a>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("help.support.contact.title")}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {t("help.support.contact.description")}
                  </p>
                  <Button asChild variant="default" size="lg">
                    <Link to={localizedPath("/contact")}>
                      {t("help.support.contact.button")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
