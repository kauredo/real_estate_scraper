import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt" as const;

export default getRequestConfig(async ({ locale }) => {
  // Use defaultLocale if locale is undefined
  const resolvedLocale = locale ?? defaultLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(resolvedLocale as (typeof locales)[number])) notFound();

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
