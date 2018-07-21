pragma solidity ^0.4.0;
contract MobilityMarket {

    struct Proposal {
        address provider;
        uint price;
        uint requestId;
    }

    struct Request{
        address rider;
        uint destLat;
        uint destLong;
        uint startLat;
        uint startLong;
        uint id;
    }

    uint numRequests;
    mapping (uint => Request) requests;
    Proposal[] public proposals;

    function MobilityMarket() public {

    }

    event RequestAdded(address, uint, uint, uint, uint, uint);
    event ProposalAdded(uint, address, uint);

    function addRideRequest(uint8 destLat, uint8 destLong, uint8 startLat, uint8 startLong) public returns (uint requestId) {
        requestId = numRequests++;
        Request memory request = Request(msg.sender, destLat, destLong, startLat, startLong, requestId);
        requests[requestId] = request;

        emit RequestAdded(request.rider, request.destLat, request.destLong, request.startLat, request.startLong, request.id);
    }

    function getRequest(uint8 requestId) returns (address, uint, uint, uint, uint, uint) {
        Request storage request = requests[requestId];
        return (request.rider, request.destLat, request.destLong, request.startLat, request.startLong, request.id);
    }

    function addProposal(uint8 requestId, address provider, uint8 bidPrice) {
        proposals.push(Proposal({
            provider: msg.sender,
            price: bidPrice,
            requestId: requestId
        }));

        emit ProposalAdded(requestId, provider, bidPrice);
    }
}