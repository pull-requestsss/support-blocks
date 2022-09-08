// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FT is ERC20 {
    address private owner;

    constructor() ERC20("Mock FT", "MFT") {
        owner = msg.sender;
    }

    function mint(address _owner, uint256 _amount) public {
        require(msg.sender == owner, "Only owner");
        _mint(_owner, _amount);
    }

    function setAllowance(address _to, uint256 _amount) public {
        _approve(msg.sender, _to, _amount);
    }
}
