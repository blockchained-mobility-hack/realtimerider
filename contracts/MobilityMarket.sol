pragma solidity ^0.4.0;

import './UrbanMileToken.sol';

contract MobilityMarket {

    struct Proposal {
        address provider;
        uint tokenAmount;
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

    struct Match {
        address rider;
        address provider;
        uint tokenAmount;
    }

    uint numRequests;
    uint numProposals;
    mapping (uint => Request) requests;
    mapping (uint => Proposal) requestProposals;
    mapping(uint => Match) matches;

    UrbanMileToken tokenContract;

    function MobilityMarket(address tokenContractAddress) public {
        tokenContract = UrbanMileToken(tokenContractAddress);
    }

    event RequestAdded(address indexed from, uint destLat, uint destLong, uint startLat, uint startLong, uint id);
    event ProposalAdded(uint requestId, uint proposalId, address provider, uint tokenAmount);

    function addRideRequest(uint8 destLat, uint8 destLong, uint8 startLat, uint8 startLong) public returns (uint requestId) {
        requestId = numRequests++;
        Request memory request = Request(msg.sender, destLat, destLong, startLat, startLong, requestId);
        requests[requestId] = request;

        emit RequestAdded(request.rider, request.destLat, request.destLong, request.startLat, request.startLong, request.id);
        return requestId;
    }

    function getRequest(uint8 requestId) returns (address rider, uint destLat, uint destLong, uint startLat, uint startLong, uint id) {
        Request storage request = requests[requestId];
        return (request.rider, request.destLat, request.destLong, request.startLat, request.startLong, request.id);
    }

    function addProposal(uint8 requestId, uint8 tokenAmount) public returns (uint proposalId)  {
        proposalId = numProposals++;
        requestProposals[proposalId] = Proposal({
            provider: msg.sender,
            tokenAmount: tokenAmount,
            requestId: requestId
            });

        emit ProposalAdded(requestId, proposalId, msg.sender, tokenAmount);
        return proposalId;
    }

    function submitProposal(uint8 requestId, uint8 proposalId) {
        // Do assert checks here
        // Did the rider really do the request?
        // Has the provider enough tokens?
        // ...

        address rider = msg.sender;
        address provider = requestProposals[proposalId].provider;
        uint tokenAmount = requestProposals[requestId].tokenAmount;

        matches[requestId] = Match({
            rider: rider,
            provider: provider,
            tokenAmount: tokenAmount
            });

        tokenContract.transferFrom(provider, rider, tokenAmount);
    }
}