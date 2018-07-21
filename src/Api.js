import Proposal from './entities/proposal'
import getWeb3 from './utils/getWeb3'

class Api {
    constructor() {
        var that = this;
        getWeb3
            .then(results => {
                var web3 = results.web3

                // Get accounts.
                this.state.web3.eth.getAccounts((error, accounts) => {
                    // Setup some dummy providers
                    that.mobilityProviders.push(new MobilityProvider(accounts[1]));
                    that.mobilityProviders.push(new MobilityProvider(accounts[2]));
                    that.mobilityProviders.push(new MobilityProvider(accounts[3]));
                });
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    mobilityProviders = [];

    getProposals(startLat, startLong, destLat, destLong) {
        var proposals = [];

        // Match providers by cheapest
        for(var index in this.mobilityProviders) {
            var mobilityProvider = this.mobilityProviders[index];
            var tokenAmount = mobilityProvider.requestProposal(startLat, startLong, destLat, destLong);
            proposals.push(mobilityProvider.providerAccountAddress, tokenAmount);

        }

        return proposals;
    }
}

module.exports = Api;