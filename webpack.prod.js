const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production', // 默认开启scope hosting，uglify等一些生产适用的功能
  output: {
    publicPath: './',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        // 'style-loader',
        // 用了minicssplugin就不需要style-loader
        // style-loader是把js中import的样式打包到js里，并在js执行时把样式插入到style标签
        // mini是把js中import的样式单独打包到一个css文件里，结合html-webpack-plugin以link方式注入
        'css-loader'
      ]
    }, {
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'), // 只转义src目录
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      // webpack5直接使用内置的asset
      // webpack4需要loader，比如file-loader, url-loader
      test: /\.(png|gif|jpg|jpeg|svg)$/i,
      type: 'asset/resource'
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
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
    // 删除之前编译的dist文件
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new BundleAnalyzerPlugin(),
    new ParallelUglifyPlugin({ // 多个子进程压缩
      uglifyJS: {
        output: {
          beautify: false, // 去掉空格 换行符
          comments: false // 去掉注释
        }
      }
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i,
      parallel: true, // 允许多进程
    })],

    // webpack打包时有自己的manifest和runtime
    // manifest：编译执行时，保留所有模块的详细要点，比如：src目录里的排布在打包后都没了，webpack记录来管理
    // runtime：浏览器运行时，webpack用来连接模块的
    // 此配置将runtime单独打一个js
    // 如果不打的话，即使业务代码没变，重新打包hash也会变，因为runtime执行的原因
    runtimeChunk: 'single',
  
    // splitChunk代码去重，比如index.js 和 print.js同时引入了lodash
    // 配置两个入口打包，lodash会被同时打入这两个文件
    // 注意：splitchunk在每次打包时，都会执行，如果库没更改只是hash不变而已
    //      所以这也是和dll的区别，dll只打一次
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    // 每个moudle.id会跟着顺序变，比如随着模块多了几个文件，会增量++。导致vendor的hash变了
    moduleIds: 'deterministic',
  }
});