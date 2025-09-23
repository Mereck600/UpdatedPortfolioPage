// // next.config.mjs
// const isProd = process.env.NODE_ENV === 'production';

// /** @type {import('next').NextConfig} */
// export default {
//   reactStrictMode: true,
//   output: 'export',

//   // If the site is served at the root of the domain, DO NOT use a basePath.
//   basePath: '',

//   images: { unoptimized: true },

//   // Expose empty prefix for raw assets; your helpers will see '' and do nothing.
//   env: {
//     NEXT_PUBLIC_BASE_PATH: '',
//   },
// };


const isProd = process.env.NODE_ENV === 'production';
export default {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/UpdatedPortfolioPage' : '',
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? '/UpdatedPortfolioPage' : '' },
};
