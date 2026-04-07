const nextConfig = {
  experimental: { appDir: false },
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:9999",
    NEXT_PUBLIC_FIREBASE_KEY: "fake-key",
  },
  webpack: (config) => {
    config.resolve.alias = {};
    config.resolve.modules = [];
    return config;
  },
};
module.exports = nextConfig;
