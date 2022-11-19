// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AllowList is Ownable {

    mapping(address => bool) public allows;

    event Allow(address indexed account, bool isAllow);

    function setAllow(address _address, bool value) public onlyOwner {
        allows[_address] = value;
        emit Allow(_address, value);
    }

}
