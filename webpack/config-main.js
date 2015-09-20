var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var REGEX = {
		JS: /\.js/,
		SSCC: /\.scss/,
		NODE_MODULES: /(node_modules)/
};

var SOURCE_DIR = require('path').resolve(__dirname, "..", "src");
var RELEASE_DIR = require('path').resolve(__dirname, "..", "public");
var dependencies  = Object.keys(require('../package.json').dependencies);

module.exports = {
		module: {
				loaders: [
						{test: REGEX.JS,   loader: 'babel', exclude: REGEX.NODE_MODULES},
						{test: REGEX.SSCC, loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 3 version!sass')}
				]
		},
		plugins: [
				new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: './js/vendors.js'}),
				new ExtractTextPlugin('css/style.css'), // extracts css and put it to <output.path>/css/style.css
		],
		context: SOURCE_DIR,
		entry: { // entry points - files that contains 'require' and will be concat into bundle
				app: "./scripts/index.js", // main enty point
				vendors: dependencies // entry points for CommonsChunkPlugin
		},
		output: {
				path: RELEASE_DIR,
				filename: "./js/app.js"
		}
};
