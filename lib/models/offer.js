var Sequelize = require('sequelize');


var Offer = function(sequelize){

    return sequelize.define('third_party_offers', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name : Sequelize.STRING(64),
        status : Sequelize.STRING(32),
        //targetType : {
        //    field: 'target_type',
        //    type: Sequelize.STRING(32)
        //},
        description: Sequelize.STRING(32),
        //programId : {
        //    field: 'program_id',
        //    type: Sequelize.INTEGER
        //},
        //productId : {
        //    field: 'product_id',
        //    type: Sequelize.INTEGER
        //}

    });

};

module.exports = Offer;