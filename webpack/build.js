var webpack = require('webpack');

var config = argv.production ? require('./config.prod') : require('./config.dev');

webpack(config).run(function(err, stats){
	console.log(stats.toString(config.stats));
});
