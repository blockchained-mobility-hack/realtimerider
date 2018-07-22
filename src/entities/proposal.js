class Proposal {
    constructor(providerAccountAddress, tokenAmount, providerName, proposalId, requestId) {
        this.providerAccountAddress = providerAccountAddress;
        this.tokenAmount = tokenAmount;
        this.providerName = providerName;
        this.proposalId = proposalId;
        this.requestId = requestId;
    }
}
module.exports = Proposal;