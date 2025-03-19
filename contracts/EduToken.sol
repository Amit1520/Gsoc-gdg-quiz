// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("EduToken", "EDU") Ownable(initialOwner) {
        _mint(initialOwner, 1000000 * 10 ** decimals());
    }

    // ✅ Mint function that only the owner can call
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
