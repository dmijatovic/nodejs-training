const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
*/
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'development',
	entry:{		
		index: './index.js'
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../public')
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
			use: [/*{
					loader: 'style-loader'
				}*/
				//extract css into separate file
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader'
				},{
					loader: 'sass-loader'
			}]
		}]
	},

	plugins: [
		/*
		new webpack.ProvidePlugin({
			'$': "jquery",
			'jQuery': "jquery",
			'Popper': 'popper.js'
		}),*/
		//copy index html
		//https://webpack.js.org/plugins/html-webpack-plugin/
		new HtmlWebpackPlugin({
			filename: 'index.html',
      template: 'index.html',
      inject: true
		}),
		//old extract text plugin to extract css
		//new ExtractTextPlugin('[name].css')		
		new MiniCssExtractPlugin({
      // Options similar to webpackOptions.output
      // both options are optional
      filename: "[name].css",
     	chunkFilename: "[id].css"
		}),
		//copy assets
		//https://webpack.js.org/plugins/copy-webpack-plugin/
		new CopyWebpackPlugin([			
			/*{ //copy all files from img folder
				from: './src/img/',
				to: 'img',
				toType: 'dir'
			}*/
			//copy all files from img dir to root
			'../assets/img/'
		])
	],
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
