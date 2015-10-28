var Sequelize = require('sequelize');


var Campaign = function(sequelize){

    return sequelize.define('advertiser_campaigns', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name : Sequelize.STRING(64),
        totalBudget: {
            field: 'total_budget',
            type: Sequelize.DECIMAL(8, 2)
        },
        dailyBudget: {
            field: 'total_budget',
            type: Sequelize.DECIMAL(8, 2)
        }
    });

};

module.exports = Campaign;