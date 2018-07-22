import Proposal from './entities/proposal'
import getWeb3 from './utils/getWeb3'
var MobilityProvider = require('./entities/mobilityProvider.js');
var MobileItem = require('./entities/mobileItem.js');
import UrbanMileToken from '../build/contracts/UrbanMileToken.json'

class Api {
    constructor(web3) {
        var that = this;
        // Get accounts.
        web3.eth.getAccounts((error, accounts) => {
            // Setup some dummy providers
            var provider1 = new MobilityProvider(accounts[1], "Lyft");
            var provider2 = new MobilityProvider(accounts[2], "Uber");

            //Define some car data
            // initial number and location of providers (can also live in backend eventually)
            var num_cars = 10;
            var provider_locations = [];

            // define the "spread" of the providers
            var interval_lat = [48.1379 - 0.005, 48.1379 + 0.005];
            var interval_lng = [11.5720 - 0.005, 11.5720 + 0.005];
            var delta_lat = interval_lat[1] - interval_lat[0];
            var delta_lng = interval_lng[1] - interval_lng[0];

            // populate the providers
            var random;
            var lat;
            var long;
            for (var i = 0; i < num_cars; i++) {
                random = Math.random();
                lat = interval_lat[0] + random * delta_lat;
                random = Math.random();
                long = interval_lng[0] + random * delta_lng;

                var mobileItem = new MobileItem(lat, long);

                if(i % 2 == 0) {
                    provider1.addMobileItem(mobileItem);
                } else {
                    provider2.addMobileItem(mobileItem);
                }
            }

            that.mobilityProviders.push(provider1);
            that.mobilityProviders.push(provider2);
        });
    }

    mobilityProviders = [];

    getProposals(startLat, startLong, destLat, destLong) {
        var proposals = [];

        // Match providers by cheapest
        for(var index in this.mobilityProviders) {
            var mobilityProvider = this.mobilityProviders[index];
            var tokenAmount = mobilityProvider.requestProposal(startLat, startLong, destLat, destLong);
            proposals.push(new Proposal(mobilityProvider.providerAccountAddress, Math.round(tokenAmount / 1000), mobilityProvider.providerName));

        }

        return proposals;
    }
}

module.exports = Api;