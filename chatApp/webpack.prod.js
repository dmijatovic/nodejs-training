const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
*/
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */
module.exports = {
	mode: 'production',
	entry:{		
		index: './src/index.js'
	},
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: ['env']
			}
		},{
			test: /\.(scss|css)$/,
			use: [
				//extract css into separate file
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options:{
						minimize: true
					}
				},{
					loader: 'sass-loader'
			}]
		}]
	},

	plugins: [
		//remove all files from dist folder on each build
		new CleanWebpackPlugin(['dist/*.*']),		
		//copy index html
		//https://webpack.js.org/plugins/html-webpack-plugin/
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		//extract css to separate file
		//https://webpack.js.org/plugins/mini-css-extract-plugin/
		new MiniCssExtractPlugin({
      // Options similar to webpackOptions.output
      // both options are optional
      filename: "[name].[chunkhash].css",
     	chunkFilename: "[id].[chunkhash].css"
		}),
		//copy assets
		//https://webpack.js.org/plugins/copy-webpack-plugin/
		new CopyWebpackPlugin([						
			//copy all files from img dir to root
			'./src/img/'
		]),
		//uglify js
		new UglifyJSPlugin()
	],

	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	}
};
