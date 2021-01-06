const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    // proxy: {
    //   '/api/': {
    //     target: 'http://zkl.com',
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  },
  module: {
    rules: [{
      test: /\.(css|scss)$/i,
      include: path.resolve(__dirname, 'src'), // 只转义src目录
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: [
    // 如果更改了entry的文件名或新增了入口，.html还是会用之前的名字
    // 手动更新是费事费力的，htmlWebpackPlugin就排上用场了
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ]
});