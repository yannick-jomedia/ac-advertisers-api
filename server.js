var Sequelize = require('sequelize')
var sticky = require('sticky-session');
var argv = require('minimist')(process.argv.slice(2));

var baseConfigPath = './conf/config.js';
var localConfigPath = './conf/config-local.js';
var config;

var baseConfig = require(argv.base ? argv.base : baseConfigPath);

if (argv.conf) {
    config = require(argv.conf)(baseConfig);
} else {
    try {
        config = require(localConfigPath)(baseConfig);
    }
    catch (e) {
        console.warn('Local config not found in standard location: ./conf/config-local.js');
    }
}

if (argv.syncAll) {
    var Models = require('./models');
    return Models.syncAll(config, argv.force)
    .catch(console.log)
    .then(process.exit);
}

if (argv.sync) {
    var Models = require('./models');
    return Models.sync(argv.sync)
    .catch(console.log)
    .then(process.exit);
}

var sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var server = require('./app')(config, sequelize);

if (!sticky.listen(server, config.port, config.addr)) {
    // Master code
    server.once('listening', function() {
        console.log('Listening on port ' + config.port );
    });
}
