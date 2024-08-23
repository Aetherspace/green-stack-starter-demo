const { withExpo } = require("@expo/next-adapter");

/** @type {import('next').NextConfig} */
const mainNextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "react-native",
    "react-native-web",
    "expo",
    "nativewind",
    // Add more React Native / Expo packages here...
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codinsonn.dev",
      }
    ]
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = withExpo(mainNextConfig);

module.exports = nextConfig;

module.exports.mainNextConfig = mainNextConfig;
