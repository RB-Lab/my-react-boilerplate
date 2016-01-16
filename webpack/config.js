/*eslint-disable no-var */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var argv = require('minimist')(process.argv.slice(2));

var SOURCE_DIR = require('path').resolve(__dirname, '..', 'src');
var RELEASE_DIR = require('path').resolve(__dirname, '..', 'public');
var dependencies = Object.keys(require('../package.json').dependencies);

var DEBUG = !!(argv.debug || argv.d);
var VERBOSE = !!(argv.verbose || argv.v);

module.exports = {
	context: SOURCE_DIR,
	entry: { // entry points - files that contains 'require' and will be concat into bundle
		app: [
			'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
			'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
			'./scripts/index.js' // main enty point
		],
		vendors: dependencies // entry points for CommonsChunkPlugin
	},
	output: {
		path: RELEASE_DIR,
		filename: 'js/app.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js/,
				loaders: [
					'react-hot',
					'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'
				],
				exclude: /(node_modules)/
			},
			{
				test: /\.scss/,
				// extract receives a string of loaders divided by '!' and applied from right to left.
				loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 3 version!sass')
			},
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract('css')
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/vendors.js'}),
		// extracts css and put it to <output.path>/css/style.css
		new ExtractTextPlugin('css/style.css'),
		// gets the index.html from SOURCE_DIR as a template and create from it <output.path>/index.html
		new HtmlPlugin({
			template: SOURCE_DIR + '/index.html',
			title: 'Test APP',
			filename: 'index.html'
		})
	],
	stats: { // The stats actually used in build and dev-server scripts
		colors: true,
		reasons: DEBUG,
		hash: VERBOSE,
		version: VERBOSE,
		timings: VERBOSE,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		cached: VERBOSE,
		cachedAssets: VERBOSE
	}
};

/*eslint-enable no-vars*/
