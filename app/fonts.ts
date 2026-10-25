import { Bricolage_Grotesque, Readex_Pro, Reem_Kufi } from 'next/font/google';

export const bricolage = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz', 'wdth'], variable: '--font-bricolage', display: 'swap' });
export const readex = Readex_Pro({ subsets: ['arabic', 'latin'], variable: '--font-readex', display: 'swap' });
export const reemKufi = Reem_Kufi({ subsets: ['arabic', 'latin'], variable: '--font-reem-kufi', display: 'swap' });
