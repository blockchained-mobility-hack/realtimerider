import Proposal from './entities/proposal'

class Api {
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