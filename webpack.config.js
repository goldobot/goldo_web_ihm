const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './js/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
	  {
        test: /\.html$/,
        use: ['html-loader']
      },
	  {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
	  {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ]
  },
  plugins: [
  new HtmlWebPackPlugin({
	template: './html/index.html',
  })
]
};