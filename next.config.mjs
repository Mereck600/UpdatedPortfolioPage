// next.config.mjs
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'UpdatedPortfolioPage'; // <- your repo name

const nextConfig = {
  reactStrictMode: true,
  output: 'export',              // makes `next build` write to ./out
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true }, // so <Image> emits plain <img>
};

export default nextConfig;
