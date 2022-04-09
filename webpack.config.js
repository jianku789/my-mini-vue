const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  entry: './src/index.js',
  output: {
    filename: 'mini-vue.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static:path.join(__dirname, 'dist')
  },
  plugins:[new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    filename:'index.html'
  })]

}