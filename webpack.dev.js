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
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src'),
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, 'src'),
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  plugins: [
    // 如果更改了entry的文件名或新增了入口，.html还是会用之前的名字
    // 手动更新是费事费力的，htmlWebpackPlugin就排上用场了
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
    new CleanWebpackPlugin(),
    // vue-loader还需要plugin这里加，比如：为了让babel也能获取.vue里的script
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,html,css,scss,sass}'],
    })
  ]
});