const path = require('path');
console.log('------------------------------------------------------------');
module.exports = env => {
  return {
    entry: {
      index: path.resolve(__dirname, './src/index.js')
    },
    output: {
      // 开发环境避免hash
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      // pathinfo: false 路径信息，默认true大项目会影响性能
    }
  };
};