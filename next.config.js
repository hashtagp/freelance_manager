module.exports = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
  },
  experimental: {
    // Optimize for Windows file system
    optimizePackageImports: ['@/components', '@/lib'],
  },
  // Better handling of file system operations on Windows
  webpack: (config, { isServer }) => {
    // Prevent webpack from watching node_modules
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
    };
    return config;
  },
};