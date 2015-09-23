var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var argv = require('minimist')(process.argv.slice(2));

var REGEX = {
	JS: /\.js/,
	SSCC: /\.scss/,
	NODE_MODULES: /(node_modules)/
};

var SOURCE_DIR = require('path').resolve(__dirname, '..', 'src');
var RELEASE_DIR = require('path').resolve(__dirname, '..', 'public');
var dependencies  = Object.keys(require('../package.json').dependencies);


var DEBUG = !!(argv.debug || argv.d);
var VERBOSE = !!(argv.verbose || argv.v);

module.exports = {
	context: SOURCE_DIR,
	entry: { // entry points - files that contains 'require' and will be concat into bundle
		app: './scripts/index.js', // main enty point
		vendors: dependencies // entry points for CommonsChunkPlugin
	},
	output: {
		path: RELEASE_DIR,
		filename: 'js/app.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{test: REGEX.JS,   loader: 'babel', exclude: REGEX.NODE_MODULES},
			{test: REGEX.SSCC, loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 3 version!sass')}
			// extract receives a string of loaders divided by '!' and applied from right to left.
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/vendors.js'}),
		new ExtractTextPlugin('css/style.css'), // extracts css and put it to <output.path>/css/style.css
		new HtmlPlugin({ // gets the index.html from SOURCE_DIR as a template and create from it <output.path>/index.html
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
