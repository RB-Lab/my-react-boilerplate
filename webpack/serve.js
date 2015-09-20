var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev-config');
var argv = require('minimist')(process.argv.slice(2));

var port = argv.port || argv.p || 3000

new WebpackDevServer(webpack(config), {
    contentBase: 'src/',
    publicPath: config.output.publicPath,
    historyApiFallback: true
}).listen(port, '127.0.0.1', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at 127.0.0.1:' + port);
});