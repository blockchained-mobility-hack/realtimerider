/**
 * Represents a Ridesharing, Flying Taxi, Bus, Train
 */
import geolib from "geolib"

class MobileItem {
    constructor(posLat, posLong) {
        this.posLat = posLat;
        this.posLong = posLong;
    }

    getDistance(destLat, destLong) {
        return geolib.getDistance(
            {latitude: this.posLat, longitude: this.posLong},
            {latitude: destLat, longitude: destLong}
        );
    }
}

module.exports = MobileItem;