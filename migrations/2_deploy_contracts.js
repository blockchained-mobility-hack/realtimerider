var UrbanMileToken = artifacts.require("./UrbanMileToken.sol");
var MobilityMarket = artifacts.require("./MobilityMarket.sol");

module.exports = function(deployer) {
    // Deploy A, then deploy B, passing in A's newly deployed address
    deployer.deploy(UrbanMileToken, 100000000, "UrbanMileToken", "UMT").then(function() {
        return deployer.deploy(MobilityMarket, UrbanMileToken.address);
    });
};