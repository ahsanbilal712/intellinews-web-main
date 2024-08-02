/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH
      : "",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: [
      "i.dawn.com",
      "i.tribune.com.pk",
      "www.geo.tv", // Add other domains as needed
      "www.thenews.com.pk", // Add the new domain here
      "www.nation.com.pk",
    ],
  },
  nextConfig,
};
