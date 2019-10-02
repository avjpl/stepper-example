const webpack = require('webpack');
const merge = require('webpack-merge');
const Jarvis = require('webpack-jarvis');

const {
  devServer,
  loadCSS,
  loadImages,
  generateSourceMaps,
} = require('./webpack.parts');

const { PORT } = require('./webpack.constants');

module.exports = merge([
  {
    plugins: [
      new Jarvis({
        port: 1337 // optional: set a port
      }),
    ],
  },
  devServer({
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || PORT,
  }),
  {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  loadCSS({
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true,
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
            hashPrefix: 'hash',

          },
          localsConvention: 'camelCase'
        },
      },
      'postcss-loader',
    ],
  }),
  loadImages(),
  generateSourceMaps({ type: 'cheap-module-source-map' }),
]);
