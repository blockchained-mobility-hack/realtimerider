/**
 * Interface for a Mobility Provider
 * He has to give a proposal for a matching based on start position and destination
 */
import geolib from "geolib"

class MobilityProvider {
    mobileItems = [];
    providerAccountAddress = "";

    constructor(providerAccountAddress) {
        this.providerAccountAddress = providerAccountAddress;
    }

    addMobileItem(mobileItem) {
        this.mobileItems.push(mobileItem);
    }

    requestProposal(startLat, startLong, destLat, destLong) {
        var closestItemDistance = -1;
        var closestMobileItem;
        for(var index in this.mobileItems) {
            var mobileItem = this.mobileItems[index];
            // Calculate distance from mobile item to rider
            var distance = mobileItem.getDistance(startLat, startLong);
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

        var tokenAmount = (totalDistance/1000) * 0.1;
        return tokenAmount;
    }
}

module.exports = MobilityProvider;