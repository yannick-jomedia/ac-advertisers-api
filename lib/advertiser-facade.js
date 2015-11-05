
var Sequelize   = require('sequelize');

var AdvertiserFacade = {};

AdvertiserFacade.addCampaign = function(campaignValues){

};

AdvertiserFacade.editCampaign = function(campaignValues){

};

AdvertiserFacade.duplicateCampaign = function(campaignValues){

};

AdvertiserFacade.getCampaigns = function(options){

};

AdvertiserFacade.getCampaign = function(campaignId){

};

AdvertiserFacade.loadModels = function(config){

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
                through: db.CampaignOffers,
                foreignKey: 'campaign_id'
            });
            db.Offer.belongsToMany(global.db.Campaign, {
                through: db.CampaignOffers,
                foreignKey: 'offer_id'
            });

            global.db = db;
        });
};



module.exports = AdvertiserFacade;