// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'UpdatedPortfolioPage'; // <- EXACT repo name

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export so GitHub Pages can serve it
  output: 'export',

  // Critical for project pages
  basePath: isProd ? `/${repo}` : '',

  // Make next/image emit <img>, no server optimizer
  images: { unoptimized: true },

  // Expose base path for raw <img>, <link>, CSS url()
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },

  // (Optional) helps some relative asset edge-cases
  // trailingSlash: true,
};

export default nextConfig;
