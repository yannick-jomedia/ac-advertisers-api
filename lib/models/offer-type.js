var Sequelize = require('sequelize');


var OfferType = function(sequelize){

    return sequelize.define('third_party_target_type', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name : Sequelize.STRING(64),
        description : Sequelize.STRING(32)
    });
};

module.exports = OfferType;