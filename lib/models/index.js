
var Sequelize   = require('sequelize');

/**
 * Load Sequelize Models
 * @param {Object} config Configuration file with database informations
 * @returns {Promise.<Sequelize>}
 */
var loadModels = function(config){

    config = config || {};
    var mysqlMaster = config.mysql.main.global;

    var sequelize = new Sequelize(mysqlMaster.database, mysqlMaster.user, mysqlMaster.password, {
        host: mysqlMaster.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    return Promise.resolve()
        .then(function(){
            require("eyes").inspector({maxLength: 6444999})('ok');
            var db = {
                sequelize,
                Advertiser : sequelize.import(__dirname + '/advertiser'),
                AdvertiserType : sequelize.import(__dirname + '/advertiser-type'),
                Campaign : sequelize.import(__dirname + '/campaign'),
                Offer : sequelize.import(__dirname + '/offer'),
                OfferType: sequelize.import(__dirname + '/offer-type'),
                CampaignOffers: sequelize.import(__dirname + '/campaign-offers')
            };

            db.AdvertiserType.belongsTo(global.db.Advertiser);
            db.OfferType.belongsTo(global.db.Offer);
            db.Campaign.belongsToMany(global.db.Offer, {
                through: global.db.CampaignOffers,
                foreignKey: 'campaign_id'
            });
            db.Offer.belongsToMany(global.db.Campaign, {
                through: global.db.CampaignOffers,
                foreignKey: 'offer_id'
            });

            return db;
        });
};

module.exports.loadModels = loadModels;