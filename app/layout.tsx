import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abdulaziz Amori — Full-Stack & AI Engineer',
  description: 'Software engineer building mobile, web, backend, and AI-powered products.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
