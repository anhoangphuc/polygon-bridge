//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PERC20 is ERC20("PERC20", "PERC20"), Ownable  {
    constructor() {
        _mint(msg.sender, 100 ether);
    }
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
}