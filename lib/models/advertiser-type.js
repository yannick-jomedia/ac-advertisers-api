var Sequelize = require('sequelize');


var AdvertiserType = function(sequelize){

    return sequelize.define('advertiser_type', {

        name: {
            type: Sequelize.STRING(64),
            primaryKey: true
        },
        description : Sequelize.STRING(255)
    });

};

module.exports = AdvertiserType;