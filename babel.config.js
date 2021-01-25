module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          components: 'components',
          assets: './src/assets/',
          hooks: './src/hooks',
        },
      },
    ],
  ],
};
