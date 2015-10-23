
module.exports = function(config, sequelize) {

    global.db = require('./models')(sequelize);

    var express = require('express');
    var bodyParser = require('body-parser');

    var app = express();
    var server = require('http').Server(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/', require('./routes/index')(app, server, config));

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return server;
};
