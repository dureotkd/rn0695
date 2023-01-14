module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@views': './src/views',
          '@assets': './src/assets',
          '@apis': './src/apis',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@slices': './src/slices',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
