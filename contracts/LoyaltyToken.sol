// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyToken is ERC20, Ownable {
    constructor() ERC20("LoyaltyToken", "LTY") Ownable(msg.sender) {}

    function issuePoints(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function redeemPoints(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
