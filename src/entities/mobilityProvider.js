/**
 * Interface for a Mobility Provider
 * He has to give a proposal for a matching based on start position and destination
 */
class MobilityProvider {
    mobileItems = [];

    requestProposal(startLat, startLong, destLat, destLong) {

        //Return the actual price
        return 10;
    }
}