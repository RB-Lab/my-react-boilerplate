var webpack = require('webpack');;
var config = require('./config.build');

var config = argv.production ? require('./config.prod') : require('./config.dev');

webpack(config).run(function(err, stats){
	console.log(stats.toString(config.stats));
});
