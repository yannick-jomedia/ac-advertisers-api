module.exports = function(sequelize) {
    var Sequelize = require('sequelize');

    var db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        //User:      sequelize.import(__dirname + '/user'),
    };

    return db;
};
