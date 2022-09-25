// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ICrypTea.sol";

contract CrypTea is ICrypTea, OwnableUpgradeable {
    /// -----------------------------------------------------------------------
    /// LIBRARY USAGE
    /// -----------------------------------------------------------------------
    using SafeERC20 for IERC20;

    /// -----------------------------------------------------------------------
    /// STORAGE VARIABLES
    /// -----------------------------------------------------------------------

    /// merkle root of the whitelisted tokens
    bytes32 public whitelistRoot;

    /// platform fees
    uint256 public protocolFees;

    /// denomiator when calculating platform fees
    uint256 public immutable DENOMINATOR = 1000;

    /// Treasury's address
    address public treasury;

    /* ===== INIT ===== */

    /// @dev Initialize
    function initialize() public initializer {
        __Ownable_init();
    }

    /// -----------------------------------------------------------------------
    /// OWNER FUNCTIONS
    /// -----------------------------------------------------------------------

    /// @notice Inherit from ICrypTea
    function whitelist(bytes32 root) external override onlyOwner {
        // new value must not be same to prevent wastage of gas
        require(root != whitelistRoot);

        // set new value and emit event
        whitelistRoot = root;
        emit Whitelist(root);
    }

    /// @notice Inherit from ICrypTea
    function setProtocolFee(uint256 _protocolFees) external override onlyOwner {
        // new value must not be same to prevent wastage of gas
        if (protocolFees == _protocolFees || _protocolFees >= DENOMINATOR)
            revert CrypTeaError(CrypTeaErrorCodes.INVALID_PROTOCOL_FEES);

        // set new value and emit event
        protocolFees = _protocolFees;
        emit ProtocolFeeSet(_protocolFees);
    }

    /// @notice Inherit from ICrypTea
    function setTreasury(address _treasury) external override onlyOwner {
        // new value must not be same to prevent wastage of gas
        if (treasury == _treasury || _treasury == address(0))
            revert CrypTeaError(CrypTeaErrorCodes.INVALID_TREASURY);

        // set new value and emit event
        treasury = _treasury;
        emit TreasurySet(_treasury);
    }

    /// -----------------------------------------------------------------------
    /// USER FUNCTIONS
    /// -----------------------------------------------------------------------

    /// @notice Inheit from ICrypTea
    function donate(
        address token,
        uint256 amount,
        address to,
        bytes32[] calldata proof
    ) external payable override {
        /// check if "token" exist in the whitelistRoot
        bytes32 leaf = keccak256(abi.encodePacked(token));
        if (!verifyCalldata(proof, whitelistRoot, leaf))
            revert CrypTeaError(CrypTeaErrorCodes.TOKEN_NOT_WHITELISTED);

        /// calculate fees
        uint256 toAdmin = _calculateFees(amount);

        /// if payment is in native token, then operate differently
        if (token == address(0)) {
            /// check amount of funds
            if (msg.value < amount)
                revert CrypTeaError(CrypTeaErrorCodes.INSUFFICIENT_FUNDS);

            /// transfer fees to treasury
            _transferETH(treasury, toAdmin);

            /// transfer amount to "to"
            _transferETH(to, amount - toAdmin);
        } else {
            /// transfer fees to treasury
            _trasnferToken(token, treasury, toAdmin);

            /// transfer amount to "to"
            _trasnferToken(token, to, amount - toAdmin);
        }

        /// emit event
        emit Donation(msg.sender, to, token, amount, amount - toAdmin);
    }

    /// -----------------------------------------------------------------------
    /// INTERNAL FUNCTIONS
    /// -----------------------------------------------------------------------

    /// @dev internal utility function to calculate fees amount
    /// @param amount Total amount to considered
    /// @return value protocol fees amount
    function _calculateFees(uint256 amount)
        internal
        view
        returns (uint256 value)
    {
        uint256 numerator = amount * protocolFees;
        value = numerator / DENOMINATOR;
    }

    /// @dev internal utility function to transfer ETH and confirm
    /// @param to Address to transfer eth to
    /// @param amount Amount of eth to be transfered
    function _transferETH(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        if (!success) revert CrypTeaError(CrypTeaErrorCodes.FAILED_TO_SEND_ETH);
    }

    /// @dev internal utility function to transfer ERC20 tokens
    /// @param token Address of token
    /// @param to Address to transfer to
    /// @param amount Amount of tokens to be transfered
    function _trasnferToken(
        address token,
        address to,
        uint256 amount
    ) internal {
        IERC20(token).safeTransferFrom(msg.sender, to, amount);
    }

    /// @dev Returns true if a `leaf` can be proved to be a part of a Merkle tree
    /// defined by `root`. For this, a `proof` must be provided, containing
    /// sibling hashes on the branch from the leaf to the root of the tree. Each
    /// pair of leaves and each pair of pre-images are assumed to be sorted.
    function verifyCalldata(
        bytes32[] calldata proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        return processProofCalldata(proof, leaf) == root;
    }

    /// @dev Returns the rebuilt hash obtained by traversing a Merkle tree up
    /// from `leaf` using `proof`. A `proof` is valid if and only if the rebuilt
    /// hash matches the root of the tree. When processing the proof, the pairs
    /// of leafs & pre-images are assumed to be sorted.
    function processProofCalldata(bytes32[] calldata proof, bytes32 leaf)
        internal
        pure
        returns (bytes32)
    {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            computedHash = _hashPair(computedHash, proof[i]);
        }
        return computedHash;
    }

    function _hashPair(bytes32 a, bytes32 b) private pure returns (bytes32) {
        return a < b ? _efficientHash(a, b) : _efficientHash(b, a);
    }

    function _efficientHash(bytes32 a, bytes32 b)
        private
        pure
        returns (bytes32 value)
    {
        /// @solidity memory-safe-assembly
        assembly {
            mstore(0x00, a)
            mstore(0x20, b)
            value := keccak256(0x00, 0x40)
        }
    }
}
