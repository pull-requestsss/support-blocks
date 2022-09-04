// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/Proxy.sol";

contract CrypTeaProxy is Proxy {
    /// -----------------------------------------------------------------------
    /// Constant variables
    /// -----------------------------------------------------------------------

    /// @notice Storage position of the address of the current implementation
    bytes32 private constant implementationPosition =
        bytes32(uint256(keccak256("CrypTea.proxy.implementation.address")) - 1);

    /// @notice Storage position of the owner of the contract
    bytes32 private constant proxyOwnerPosition =
        bytes32(uint256(keccak256("CrypTea.proxy.owner")) - 1);

    /// -----------------------------------------------------------------------
    /// Modifiers
    /// -----------------------------------------------------------------------

    modifier onlyProxyOwner() {
        require(msg.sender == proxyOwner(), "Not Proxy owner");
        _;
    }

    /* ===== INIT ===== */

    /// @dev Constructor
    constructor() {
        _setUpgradeabilityOwner(msg.sender);
    }

    /// -----------------------------------------------------------------------
    /// Owner Actions
    /// -----------------------------------------------------------------------

    /// @dev Transfer the ownership.
    /// @param _newOwner New proxy owner
    function transferProxyOwnership(address _newOwner) public onlyProxyOwner {
        require(_newOwner != address(0));
        _setUpgradeabilityOwner(_newOwner);
    }

    /// @dev Allows the proxy owner to upgrade the implementation contract.
    /// @param _newImplementation Address of the new implementation contract
    function upgradeTo(address _newImplementation) public onlyProxyOwner {
        _upgradeTo(_newImplementation);
    }

    /// -----------------------------------------------------------------------
    /// Internal Actions
    /// -----------------------------------------------------------------------

    /// @dev Upgrades the implementation contract address.
    /// @param _newImplementation Address of the new implementation contract
    function _upgradeTo(address _newImplementation) internal {
        address currentImplementation = _implementation();
        require(currentImplementation != _newImplementation);
        _setImplementation(_newImplementation);
    }

    /// @dev Sets the implementation contract address.
    /// @param _newImplementation Address of the new implementation contract
    function _setImplementation(address _newImplementation) internal {
        bytes32 position = implementationPosition;
        assembly {
            sstore(position, _newImplementation)
        }
    }

    /// @dev Returns the address of the current implementation contract address.
    /// @return impl Address of the current implementation contract
    function _implementation() internal view override returns (address impl) {
        bytes32 position = implementationPosition;
        assembly {
            impl := sload(position)
        }
    }

    /// @dev Sets the address of the proxy owner.
    /// @param _newProxyOwner Address of new proxy owner
    function _setUpgradeabilityOwner(address _newProxyOwner) internal {
        bytes32 position = proxyOwnerPosition;
        assembly {
            sstore(position, _newProxyOwner)
        }
    }

    /// -----------------------------------------------------------------------
    /// Getters
    /// -----------------------------------------------------------------------

    /// @dev Returns the address of the current implementation contract address.
    function implementation() external view returns (address) {
        return _implementation();
    }

    /// @dev Returns the proxy owner address.
    /// @return owner Address of proxy contract
    function proxyOwner() public view returns (address owner) {
        bytes32 position = proxyOwnerPosition;
        assembly {
            owner := sload(position)
        }
    }
}
