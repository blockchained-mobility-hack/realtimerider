var MobilityMarket = artifacts.require("./MobilityMarket.sol");

module.exports = function(deployer) {
    deployer.deploy(MobilityMarket);
};