/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Remove any i18n config here as we're handling it through middleware
  images: {
    domains: [
      'localhost',
      'placehold.it',
      'placekitten.com', // Temporary for development
      'i.imgur.com',     // Temporary for development
      'images.unsplash.com' // Temporary for development
    ],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    // Add GraphQL loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    // Add MDX file handling
    config.module.rules.push({
      test: /\.mdx?$/,
      use: ['@mdx-js/loader'],
    });

    return config;
  },
};

module.exports = nextConfig;
