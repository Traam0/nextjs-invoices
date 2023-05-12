/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
  // future: { webpack5: true },
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/dashboard", permanent: true },
      { source: "/login", destination: "/auth/login", permanent: true },
      { source: "/signin", destination: "/auth/login", permanent: true },
      { source: "/project", destination: "/projects", permanent: true },
    ];
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    localeDetection: true,
  },
};

module.exports = nextConfig;
