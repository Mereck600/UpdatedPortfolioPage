// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'UpdatedPortfolioPage';

export default {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
};
