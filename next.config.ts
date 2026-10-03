import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // Each language has its own root layout, so unmatched URLs need a standalone 404 page.
  experimental: { globalNotFound: true }
};
export default nextConfig;
