module.exports = {
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/class',
      //   permanent: false,
      // },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
