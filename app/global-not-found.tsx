import './globals.css';
import type { Metadata } from 'next';
import { archivo, plexArabic } from './fonts';
import { getDictionary } from './i18n/ui';

export const metadata: Metadata = { title: 'Page not found — Abdulaziz Amori' };

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function GlobalNotFound() {
  const en = getDictionary('en').notFound;
  const ar = getDictionary('ar').notFound;
  return <html lang="en" className={`${archivo.variable} ${plexArabic.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head>
    <body>
      <main className="not-found">
        <h1>{en.title}</h1>
        <p>{en.body}</p>
        <a className="button" href="/#work">{en.cta}</a>
        <div lang="ar" dir="rtl" className="not-found-ar">
          <p>{ar.title} {ar.body}</p>
          <a className="text-link" href="/ar#work">{ar.cta}</a>
        </div>
      </main>
    </body>
  </html>;
}
