/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix for the CSS prerendering error
  experimental: {
    optimizeCss: false,
  },
  
  // Handle webpack module resolution
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  
  // Optional: Enable if you still have TypeScript errors during build
  typescript: {
    ignoreBuildErrors: false, // Set to true temporarily if needed
  },
  
  // Optional: Enable if you have ESLint errors during build  
  eslint: {
    ignoreDuringBuilds: false, // Set to true temporarily if needed
  }
}

module.exports = nextConfig
