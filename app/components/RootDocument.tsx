import type { Metadata, Viewport } from 'next';
import { getDictionary, type Locale } from '../i18n/ui';
import { bricolage, readex, reemKufi } from '../fonts';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1b6a8f' },
    { media: '(prefers-color-scheme: dark)', color: '#100c24' }
  ]
};

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const image = { url: `/og-${locale}.jpg`, width: 1200, height: 630, alt: t.meta.title };
  return {
    // Netlify sets URL to the site's primary address at build time; share images need absolute links.
    metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: '/', ar: '/ar' } },
    openGraph: { title: t.meta.title, description: t.meta.ogDescription, type: 'website', locale: locale === 'ar' ? 'ar_SA' : 'en_US', images: [image] },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.ogDescription, images: [image.url] }
  };
}

// Applies a saved theme choice before first paint so the page never flashes the wrong colours.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  const fonts = locale === 'ar' ? `${bricolage.variable} ${readex.variable} ${reemKufi.variable}` : `${bricolage.variable} ${readex.variable}`;
  return <html lang={locale} dir={t.dir} className={fonts} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head>
    {/* Extensions such as Grammarly add attributes to <body> before React loads. */}
    <body suppressHydrationWarning>{children}</body>
  </html>;
}
