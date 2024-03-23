// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Authentication {
    mapping(address => bool) public authenticatedUsers;

    event UserAuthenticated(address indexed user);

    modifier onlyAuthenticated() {
        require(authenticatedUsers[msg.sender], "User not authenticated");
        _;
    }

    function authenticate() external {
        authenticatedUsers[msg.sender] = true;
        emit UserAuthenticated(msg.sender);
    }

    function isUserAuthenticated(address user) external view returns (bool) {
        return authenticatedUsers[user];
    }
}
