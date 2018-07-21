const MobilityMarket = artifacts.require("MobilityMarket")

contract('MobilityMarket', (accounts) => {
    it("should verify no requests are filed", async () => {
        const mobilityMarketContract = await MobilityMarket.deployed();
        console.log(await mobilityMarketContract.getRequest.call(0));

        //assert.equal(destLat, 0,
        //    "default value was zero")
    })
});