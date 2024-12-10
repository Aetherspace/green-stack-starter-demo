const { withExpo } = require("@expo/next-adapter");
const mainNextConfig = require("./next.config.base.cjs");

/** @type {import('next').NextConfig} */
const nextConfig = withExpo(mainNextConfig);

module.exports = nextConfig;
