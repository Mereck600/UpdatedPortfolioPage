// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'UpdatedPortfolio'; // your repo name

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  images: { unoptimized: true },

  // 👇 this makes NEXT_PUBLIC_BASE_PATH available in your code
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
};

export default nextConfig;
