// next.config.mjs
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'UpdatedPortfolioPage'; // exact repo name

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  images: { unoptimized: true },

  // for raw <img>, <link rel="icon">, CSS url(), etc.
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
};

export default nextConfig;
