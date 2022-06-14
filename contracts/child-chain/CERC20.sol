//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CERC20 is ERC20("CERC20", "CERC20"), Ownable {
    using SafeMath for uint256;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    address public childChainManagerProxy;
    constructor(address _childChainManagerProxy) {
        childChainManagerProxy = _childChainManagerProxy;
    }

    function updateChilChainManager(address _childChainManager) external onlyOwner {
        childChainManagerProxy = _childChainManager;
    }

    function deposit(address user, bytes calldata depositData)external {
        require(msg.sender == childChainManagerProxy, "You're not allowed to deposit");

        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _mint(user, amount);
        emit Deposit(user, amount);
    }

    function withdraw(uint256 amount) external {
        _burn(msg.sender, amount);
        emit Withdraw(msg.sender, amount);
    }
}