module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@app-core': './src/app-core',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          '@views': './src/views',
        },
      },
    ],
  ],
};
