/*eslint-disable no-var, no-console */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config.dev');
var argv = require('minimist')(process.argv.slice(2));

var SOURCE_DIR = require('path').resolve(__dirname, '..', 'src');
var port = argv.port || argv.p || 3000;

new WebpackDevServer(webpack(config), {
	contentBase: SOURCE_DIR,
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: config.stats
}).listen(port, '127.0.0.1', function runServer(err) {
	if (err) {
		return console.log(err);
	}
	console.log('Listening at 127.0.0.1:' + port);
});
/*eslint-enable no-vars*/
