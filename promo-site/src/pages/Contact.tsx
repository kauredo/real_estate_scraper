import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Label } from "../components/ui/Label";
import { SEO } from "../components/SEO";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with MyAgentWebsite"
        description="Have questions? Want to schedule a demo? Contact MyAgentWebsite team. We're here to help real estate agents succeed online."
        canonical="/contact"
        keywords="contact myagentwebsite, schedule demo, customer support, get in touch"
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            {t("contact.hero.badge")}
          </Badge>
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

      {/* Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t("contact.form.heading")}
              </h2>
              <p className="text-gray-600 mb-8">
                {t("contact.form.description")}
              </p>

              {isSuccess ? (
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center gap-4 text-green-600">
                      <CheckCircle className="h-8 w-8" />
                      <div>
                        <h3 className="font-bold text-lg">
                          {t("contact.form.success.title")}
                        </h3>
                        <p className="text-green-700">
                          {t("contact.form.success.message")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">
                      {t("contact.form.fields.name.label")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.fields.name.placeholder")}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      {t("contact.form.fields.email.label")}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.fields.email.placeholder")}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      {t("contact.form.fields.phone.label")}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contact.form.fields.phone.placeholder")}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">
                      {t("contact.form.fields.company.label")}
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t(
                        "contact.form.fields.company.placeholder"
                      )}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">
                      {t("contact.form.fields.message.label")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t(
                        "contact.form.fields.message.placeholder"
                      )}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>{t("contact.form.submitting")}</>
                    ) : (
                      <>
                        {t("contact.form.submit")}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t("contact.info.heading")}
              </h2>
              <p className="text-gray-600 mb-8">
                {t("contact.info.description")}
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">
                          {t("contact.info.email.title")}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {t("contact.info.email.description")}
                        </p>
                        <a
                          href="mailto:contact@example.com"
                          className="text-blue-600 hover:underline"
                        >
                          contact@example.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">
                          {t("contact.info.phone.title")}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {t("contact.info.phone.description")}
                        </p>
                        <a
                          href="tel:+1234567890"
                          className="text-blue-600 hover:underline"
                        >
                          +123 456 7890
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">
                          {t("contact.info.location.title")}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {t("contact.info.location.address")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">
                          {t("contact.info.hours.title")}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {t("contact.info.hours.weekdays")}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {t("contact.info.hours.weekend")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t("contact.faq.badge")}
            </Badge>
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
                <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>{t("contact.faq.questions.0.question")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t("contact.faq.questions.0.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>{t("contact.faq.questions.1.question")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t("contact.faq.questions.1.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>{t("contact.faq.questions.2.question")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t("contact.faq.questions.2.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>{t("contact.faq.questions.3.question")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t("contact.faq.questions.3.answer")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
