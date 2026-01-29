import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiRoutes } from "@/utils/routes";
import Flashes from "@/components/ui/Flashes";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";

export default function ClubJoinForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState({ type: "", message: "" });
  const form = useRef<HTMLFormElement>(null);
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear error when user starts typing
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    if (error) setError("");
  };

  const validateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid_params = pattern.test(email) && name && phone && termsAccepted;

    if (valid_params && form.current) {
      form.current.submit();
      setFlash({
        type: "success",
        message: t("club.flash.join.thanks"),
      });
      form.current.reset();
      setName("");
      setEmail("");
      setPhone("");
      setTermsAccepted(false);
      setError("");
    } else if (!termsAccepted) {
      setError(t("club.form.error.terms"));
    } else {
      setError(t("club.form.error.generic"));
    }
  };

  const clearFlash = () => {
    setFlash({ type: "", message: "" });
  };

  return (
    <div className="p-8 relative rounded-lg bg-white/50 dark:bg-dark/50">
      {flash.type && flash.message && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}
      <h3 className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-0">
        {t("club.form.titles.main")}
      </h3>
      <p className="leading-relaxed mb-8">
        <span className="flex items-center font-medium tracking-wide text-beige-default dark:text-beige-medium text-sm mt-2">
          {t("club.form.consent")}
        </span>
        {error && (
          <span
            role="alert"
            className="flex items-center font-medium tracking-wide text-red-500 text-sm mt-2"
          >
            {error}
          </span>
        )}
      </p>
      <form
        ref={form}
        onSubmit={(e) => validateUser(e)}
        action={apiRoutes.clubJoin}
        method="post"
        className="space-y-5"
      >
        <FloatingLabelInput
          id="club-name"
          type="text"
          label={t("club.form.fields.name")}
          name="name"
          value={name}
          onChange={(e) => handleInputChange(setName, e.target.value)}
          required
          error={!!error && !name}
        />
        <FloatingLabelInput
          id="club-phone"
          type="tel"
          label={t("club.form.fields.phone")}
          name="phone"
          value={phone}
          onChange={(e) => handleInputChange(setPhone, e.target.value)}
          required
          error={!!error && !phone}
        />
        <FloatingLabelInput
          id="club-email"
          type="email"
          label={t("club.form.fields.email")}
          name="email"
          value={email}
          onChange={(e) => handleInputChange(setEmail, e.target.value)}
          required
          error={!!error && !pattern.test(email)}
        />
        <div className="flex items-center">
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={(checked: boolean) => {
              setTermsAccepted(checked);
              if (error) setError("");
            }}
            id="club-terms"
            name="terms_accepted"
            aria-describedby="terms-description"
          />
          <Label htmlFor="club-terms" className="text-sm ml-2 cursor-pointer">
            {t("club.form.fields.terms_html")}
          </Label>
        </div>
        <Button type="submit" className="w-full">
          {t("club.form.submit")}
        </Button>
      </form>
    </div>
  );
}
