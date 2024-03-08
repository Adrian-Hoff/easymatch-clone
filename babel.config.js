module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.ts', '.tsx', '.json'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@config': './src/config',
            '@contexts': './src/contexts',
            '@interfaces': './src/interfaces',
            '@hooks': './src/hooks',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  }
}
