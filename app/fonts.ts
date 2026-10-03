import { Tajawal, Archivo, IBM_Plex_Sans_Arabic } from 'next/font/google';

export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
export const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-plex-arabic', display: 'swap' });
export const tajawal = Tajawal({ subsets: ['arabic', 'latin'], weight: ['700', '800'], variable: '--font-tajawal', display: 'swap' });

