var mainConf = require('./config-main');
var merge = require('lodash').merge.bind(null, {});

module.exports = merge(mainConf, {
    devtool: 'inline-source-map',
    cache: true,
    stats: {colors: true, reasons: true}
});