const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const {
  extractCSS,
  loadImages,
  loadFonts,
} = require('./webpack.parts');

module.exports = merge([
  {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/(.*)syncRoutes(\.*)/, resource => {
        resource.request = resource.request.replace(/syncRoutes/, 'asyncRoutes');
      })
    ],
  },
  extractCSS({
    use: [
      MiniCssExtractPlugin.loader,
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
  loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),
  loadFonts({
    name: 'fonts/[name].[ext]',
  }),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  },
]);
