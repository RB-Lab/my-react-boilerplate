var mainConf = require('./config');
var merge = require('lodash').merge.bind(null, {});

module.exports = merge(mainConf, {
	devtool: 'inline-source-map',
	cache: true,
	debug: false,
});
