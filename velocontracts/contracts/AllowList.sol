// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AllowList is Ownable {

    mapping(address => bool) public allowlists;

    function addAllowlist(address _address) public onlyOwner {
        allowlists[_address] = true;
    }

    function removeAllowlist(address _address) public onlyOwner {
        allowlists[_address] = false;
    }
}
