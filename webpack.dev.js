const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    // eslint stylelint报错信息显示在页面上
    overlay: true
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
      // 强制eslint先执行
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      // webpack5直接使用内置的asset
      // webpack4需要loader，比如file-loader, url-loader
      test: /\.(png|gif|jpg|jpeg|svg)$/i,
      type: 'asset/resource'
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    }]
  },
  plugins: [
    // 如果更改了entry的文件名或新增了入口，.html还是会用之前的名字
    // 手动更新是费事费力的，htmlWebpackPlugin就排上用场了
    new HtmlWebpackPlugin({
      title: 'Test',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // vue-loader还需要plugin这里加，比如：为了让babel也能获取.vue里的script
    new StyleLintPlugin({
      files: ['**/*.{vue,html,css,scss,sass}'],
    })
  ]
});