import type { Metadata, Viewport } from 'next';
import { getDictionary, type Locale } from '../i18n/ui';
import { tajawal, archivo, plexArabic } from '../fonts';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e4e7ea' },
    { media: '(prefers-color-scheme: dark)', color: '#10141b' }
  ]
};

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: '/', ar: '/ar' } },
    openGraph: { title: t.meta.title, description: t.meta.ogDescription, type: 'website', locale: locale === 'ar' ? 'ar_SA' : 'en_US' }
  };
}

// Applies a saved theme choice before first paint so the page never flashes the wrong colours.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  const fonts = locale === 'ar' ? `${archivo.variable} ${plexArabic.variable} ${tajawal.variable}` : archivo.variable;
  return <html lang={locale} dir={t.dir} className={fonts} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head>
    <body>{children}</body>
  </html>;
}
