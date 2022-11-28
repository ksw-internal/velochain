// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AllowList is Ownable {
    bool private inited;
    mapping(address => bool) public allows;

    event Allow(address indexed account, bool isAllow);

    function setAllow(address _address, bool value) public onlyOwner {
        allows[_address] = value;
        emit Allow(_address, value);
    }

    function init() external {
        require(!inited, "already inited");
        inited = true;
        transferOwnership(msg.sender);
    }
}
