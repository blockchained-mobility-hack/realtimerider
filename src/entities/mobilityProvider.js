/**
 * Interface for a Mobility Provider
 * He has to give a proposal for a matching based on start position and destination
 */


class MobilityProvider {
    mobileItems = [];
    providerAccountAddress = "";

    constructor(providerAccountAddress) {
        this.providerAccountAddress = providerAccountAddress;
    }

    requestProposal(startLat, startLong, destLat, destLong) {
        var closestItemDistance = -1;
        var closestMobileItem;
        for(var mobileItem in this.mobileItems) {
            // Calculate distance from mobile item to rider
            distance = mobileItem.getDistance(startLat, startLong);
            if(distance < closestItemDistance || closestItemDistance == -1) {
                closestItemDistance = distance;
                closestMobileItem = mobileItem
            }
        }

        var totalDistance = geolib.getDistance(
            {latitude: startLat, longitude: startLong},
            {latitude: closestMobileItem.posLat, longitude: closestMobileItem.posLong}
        );
        totalDistance += geolib.getDistance(
            {latitude: startLat, longitude: startLong},
            {latitude: destLat, longitude: destLong}
        );

        var tokenAmount = totalDistance * 0.1;
        return tokenAmount;
    }
}

module.exports = MobilityProvider;