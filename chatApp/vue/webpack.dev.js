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
	},
	/**
	 * Display stats, see link below for complete list
	 * https://webpack.js.org/configuration/stats/#stats
	 */
	stats:{
		// fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
		all: undefined,
		// Add asset Information
		assets: true,
		// Sort assets by a field
  	// You can reverse the sort with `!field`.
  	//assetsSort: "!field",
		// Add build date and time information
		builtAt: false,
		// Add information about cached (not built) modules
		cached: false,
		// Show cached assets (setting this to `false` only shows emitted files)
		cachedAssets: false,
		// Add children information
		children: false,
		// `webpack --colors` equivalent
		colors: true,
		// Display the entry points with the corresponding bundles
		entrypoints: false,
		// Add --env information
		env: true,
		// Add errors
		errors: true,
		// Add details to errors (like resolving log)
		errorDetails: true,
		// Add the hash of the compilation
		hash: false,
		// Set the maximum number of modules to be shown
		//maxModules: 15,
		// Add built modules information
		modules: false,
		// Add the source code of modules
		source: false,
	}
};
