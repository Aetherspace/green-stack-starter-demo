const { withExpo } = require("@expo/next-adapter");
const mainNextConfig = require("./next.config.base");

/** @type {import('next').NextConfig} */
const nextConfig = withExpo(mainNextConfig);

module.exports = nextConfig;
