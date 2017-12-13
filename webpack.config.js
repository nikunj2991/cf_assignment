const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		title: 'CF_Task',
  		template: 'src/index.html'
  	})
  ],
  module: {
	  rules: [
	    {
	      test: /\.jsx?$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: { presets: [ "es2015", "react"] }
	        }
	      }
	    },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      }
	  ]
	}
};