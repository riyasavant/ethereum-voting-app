pragma solidity ^0.4.17;

contract Voting {
    mapping(bytes32 => uint8) public votesReceived;

    bytes32[] public candidateList;

    function Voting(bytes32[] candidateNames) public {
        candidateList = candidateNames;
    }

    function totalVotesFor(bytes32 candidate) public view returns (uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    function validCandidate(bytes32 candidate) public view returns (bool) {
        for (uint256 i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
