import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });

export const metadata: Metadata = {
  title: 'Abdulaziz Amori — Flutter & Full-Stack Engineer',
  description: 'Software engineer in Jeddah building Flutter apps, web platforms, Laravel and Node APIs, and AI features. Apps live on the App Store and Google Play.',
  openGraph: {
    title: 'Abdulaziz Amori — Flutter & Full-Stack Engineer',
    description: 'Flutter apps, web platforms, APIs, and AI features — designed, built, and shipped end to end.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e4e7ea' },
    { media: '(prefers-color-scheme: dark)', color: '#10141b' }
  ]
};

// Applies a saved theme choice before first paint so the page never flashes the wrong colours.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={archivo.variable} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head>
    <body>{children}</body>
  </html>;
}
