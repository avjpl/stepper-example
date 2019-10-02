const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  loadJavaScript,
  loadSvg,
} = require('./webpack.parts');

module.exports = mode => merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
        template: 'web/index.html',
      }),
    ],
  },
  loadSvg(),
  loadJavaScript({
    ...(mode === 'production' ? { exclude: /node_modules/ } : {}),
  }),
]);
