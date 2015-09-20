var webpack = require('webpack');
var mainConf = require('./config-main');
var merge = require('lodash').merge.bind(null, {});

module.exports = merge(mainConf, {
	devtool: 'source-map',
	plugins: mainConf.plugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	])
});
