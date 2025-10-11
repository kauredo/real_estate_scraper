const withNextIntl = require("next-intl/plugin");

const withNextIntlPlugin = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
};

module.exports = withNextIntlPlugin(nextConfig);
