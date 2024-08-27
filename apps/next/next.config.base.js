/** @type {import('next').NextConfig} */
const mainNextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "react-native",
    "react-native-web",
    "expo",
    "nativewind",
    "react-native-css-interop",
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

// Re-exported separately so it can be reused
// in other configs like in `with/automatic-docs`
module.exports = mainNextConfig;
