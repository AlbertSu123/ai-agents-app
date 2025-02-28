// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {console2} from "forge-std/src/console2.sol";

contract Bounty is Ownable {
    struct Bounty {
        string description;
        string title;
        uint256 value;
        uint256 bountyScore;
        string creatingUsername;
        uint256 createdAt;
        uint256 filledAt;
    }

    mapping(uint256 bountyId => Bounty) public bounties;
    uint256[] public bountyIds;

    constructor() Ownable(msg.sender) {}

    function createBounty(
        string memory description,
        string memory title,
        uint256 value,
        uint256 bountyScore,
        string memory creatingUsername
    ) external {
        Bounty memory bounty = Bounty({
            description: description,
            title: title,
            value: value,
            bountyScore: bountyScore,
            creatingUsername: creatingUsername,
            createdAt: block.timestamp,
            filledAt: type(uint256).max
        });
        bountyIds.push(bountyIds.length);
        bounties[bountyIds.length - 1] = bounty;
    }

    function getBounties() external view returns (Bounty[] memory) {
        Bounty[] memory bountiesArray = new Bounty[](bountyIds.length);
        for (uint256 i = 0; i < bountyIds.length; i++) {
            bountiesArray[i] = bounties[bountyIds[i]];
        }
        return bountiesArray;
    }
}
