const path = require('path');

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
  webpack: (config, { isServer, dev }) => {
    // Add webpack aliases to ensure path resolution works in all environments
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/contexts': path.resolve(__dirname, 'src/contexts'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    };

    // Prevent webpack from watching node_modules
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
    };

    // Log webpack alias configuration for debugging (only in build)
    if (!dev && !isServer) {
      console.log('Webpack aliases configured for production build');
    }

    return config;
  },
};