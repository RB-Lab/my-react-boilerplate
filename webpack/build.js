var webpack = require('webpack');
var config = require('./config.build');

webpack(config).run(function(err, stats){
	console.log(stats.toString(config.stats));
});
