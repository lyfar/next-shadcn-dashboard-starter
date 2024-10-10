/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      'react-native-config': 'react-native-config',
    })
    config.resolve.alias = {
      ...config.resolve.alias,
      'three': 'three/src/Three',
    }
    return config
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig
