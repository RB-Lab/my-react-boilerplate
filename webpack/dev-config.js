var mainConf = require('./config-main');
var merge = require('lodash').merge.bind(null, {});

module.exports = merge(mainConf, {
	devtool: 'inline-source-map',
	cache: true,
	debug: false,
	stats: {
		assets: true,
		colors: true,
		version: true,
		modules: false,
		hash: false,
		timings: false,
		chunks: true,
		chunkModules: false,
		reasons : true,
		cached : true,
		chunkOrigins : true
	}
});
