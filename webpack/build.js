var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var config = argv.production ? require('./config.prod') : require('./config.dev');

webpack(config).run(function(err, stats){
	console.log(stats.toString(config.stats));
});
