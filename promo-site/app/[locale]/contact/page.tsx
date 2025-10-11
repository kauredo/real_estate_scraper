"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Globe, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {t("contact.hero.title")}
            <br />
            <span className="text-blue-600">
              {t("contact.hero.titleHighlight")}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("contact.hero.description")}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t("contact.form.title")}</CardTitle>
                  <CardDescription>
                    {t("contact.form.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {t("contact.form.fields.name.label")}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t(
                            "contact.form.fields.name.placeholder",
                          )}
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {t("contact.form.fields.email.label")}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t(
                            "contact.form.fields.email.placeholder",
                          )}
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t("contact.form.fields.phone.label")}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder={t(
                            "contact.form.fields.phone.placeholder",
                          )}
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">
                          {t("contact.form.fields.company.label")}
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder={t(
                            "contact.form.fields.company.placeholder",
                          )}
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          {t("contact.form.fields.message.label")}
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t(
                            "contact.form.fields.message.placeholder",
                          )}
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Send className="mr-2 h-4 w-4" />
                        {t("contact.form.submit")}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        {t("contact.form.terms")}
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {t("contact.form.success.title")}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {t("contact.form.success.message")}
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                      >
                        {t("contact.form.success.cta")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>{t("contact.info.email.title")}</CardTitle>
                  <CardDescription>
                    {t("contact.info.email.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">
                        {t("contact.info.email.general")}
                      </p>
                      <a
                        href="mailto:hello@myagentwebsite.com"
                        className="text-blue-600 hover:underline"
                      >
                        hello@myagentwebsite.com
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {t("contact.info.email.support")}
                      </p>
                      <a
                        href="mailto:support@myagentwebsite.com"
                        className="text-blue-600 hover:underline"
                      >
                        support@myagentwebsite.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>{t("contact.info.response.title")}</CardTitle>
                  <CardDescription>
                    {t("contact.info.response.time")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {t("contact.info.response.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">
                    {t("contact.info.trial.title")}
                  </h3>
                  <p className="text-white/90 mb-4 text-sm">
                    {t("contact.info.trial.description")}
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>{t("contact.info.trial.benefits.fast")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>{t("contact.info.trial.benefits.easy")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>{t("contact.info.trial.benefits.cancel")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("contact.faq.heading")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("contact.faq.subheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("contact.faq.questions.launch.question")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {t("contact.faq.questions.launch.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("contact.faq.questions.technical.question")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {t("contact.faq.questions.technical.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("contact.faq.questions.domain.question")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {t("contact.faq.questions.domain.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("contact.faq.questions.help.question")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {t("contact.faq.questions.help.answer")}
                </p>
              </CardContent>
            </Card>
          </div>
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
