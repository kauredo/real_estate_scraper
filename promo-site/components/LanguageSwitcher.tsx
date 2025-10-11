"use client";

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import Link from 'next/link';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Get the path without the locale prefix
  // For PT: pathname is like "/about"
  // For EN: pathname is like "/en/about"
  const getLocalizedPath = (newLocale: string) => {
    // Remove current locale prefix if it exists
    let path = pathname;
    if (pathname.startsWith('/en')) {
      path = pathname.slice(3) || '/';
    }

    // Add new locale prefix if needed (only for English)
    return newLocale === 'en' ? `/en${path}` : path;
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <Link href={getLocalizedPath('pt')}>
        <Button
          variant={locale === 'pt' ? 'default' : 'ghost'}
          size="sm"
          className="h-8 px-3"
        >
          PT
        </Button>
      </Link>
      <Link href={getLocalizedPath('en')}>
        <Button
          variant={locale === 'en' ? 'default' : 'ghost'}
          size="sm"
          className="h-8 px-3"
        >
          EN
        </Button>
      </Link>
    </div>
  );
}
