const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    print: path.resolve(__dirname, './src/print.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(css|scss)$/i,
      use: [
        MiniCssExtractPlugin.loader,
        // 'style-loader',
        // 用了minicssplugin就不需要style-loader
        // style-loader是把js中import的样式打包到js里，并在js执行时把样式插入到style标签
        // mini是把js中import的样式单独打包到一个css文件里，结合html-webpack-plugin以link方式注入
        'css-loader'
      ]
    }, {
      // webpack5直接使用内置的asset
      // webpack4需要loader，比如file-loader, url-loader
      test: /\.(png|gif|jpg|jpeg|svg)$/i,
      type: 'asset/resource'
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },]
  },
  plugins: [
    // 如果更改了entry的文件名或新增了入口，.html还是会用之前的名字
    // 手动更新是费事费力的，htmlWebpackPlugin就排上用场了
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
    // 删除之前编译的dist文件
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new BundleAnalyzerPlugin()
  ],
  // splitChunk代码去重，比如index.js 和 print.js同时引入了lodash
  // 配置两个入口打包，lodash会被同时打入这两个文件
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};