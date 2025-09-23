// // next.config.mjs
// const isProd = process.env.NODE_ENV === 'production';
// const repo = 'UpdatedPortfolioPage'; // EXACT repo name

// /** @type {import('next').NextConfig} */
// export default {
//   reactStrictMode: true,
//   output: 'export',
//   basePath: isProd ? `/${repo}` : '',
//   images: { unoptimized: true },
//   env: {
//     NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
//   },
// };


const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  output: 'export',
  basePath: '',             // ← IMPORTANT: custom domain at root → no basePath
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: '' }, // for any raw <img>/CSS you prefix
};
