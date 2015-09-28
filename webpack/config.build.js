var webpack = require('webpack');
var mainConf = require('./config');
var merge = require('lodash').merge;
var argv = require('minimist')(process.argv.slice(2));

var PRODUCTION_MODE = !!argv.production;

var buildPlugins = [new webpack.optimize.OccurenceOrderPlugin()];
var prodPlugins = [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin(),
	new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = merge({}, baseConf, {
	devtool: 'source-map',
	plugins: baseConf.plugins.concat(PRODUCTION_MODE ? buildPlugins.concat(prodPlugins) : buildPlugins)
});
