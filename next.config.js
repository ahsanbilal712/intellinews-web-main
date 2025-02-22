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
  images: {
    domains: [
      "i.dawn.com",
      "i.tribune.com.pk",
      "www.geo.tv",
      "www.thenews.com.pk",
      "www.nation.com.pk",
    ],
  },
  // Add the rewrites function
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
