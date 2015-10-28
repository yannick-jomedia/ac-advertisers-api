var Sequelize = require('sequelize');


var Advertiser = function(sequelize){

    return sequelize.define('advertisers', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name : Sequelize.STRING(64),
        description : Sequelize.STRING(255),
        website : Sequelize.STRING(32)
    });

};

module.exports = Advertiser;