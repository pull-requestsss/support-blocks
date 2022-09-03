// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ICrypTea {
    /// -----------------------------------------------------------------------
    /// ERRORS
    /// -----------------------------------------------------------------------

    enum CrypTeaErrorCodes {
        INVALID_WHITELIST_ROOT,
        INVALID_PROTOCOL_FEES,
        INVALID_TREASURY,
        TOKEN_NOT_WHITELISTED,
        INSUFFICIENT_FUNDS,
        FAILED_TO_SEND_ETH
    }

    error CrypTeaError(CrypTeaErrorCodes code);

    /// -----------------------------------------------------------------------
    /// EVENTS
    /// -----------------------------------------------------------------------

    /// @dev emitted when new merkle root is set
    /// @param root Merkle tree's root
    event Whitelist(bytes32 indexed root);

    /// @dev emitted when protocol fees is set
    /// @param protocolFees value of new protcol fees
    event ProtocolFeeSet(uint256 protocolFees);

    /// @dev emitted when treasury contract is set
    /// @param treasury Address of new treasury contract
    event TreasurySet(address treasury);

    /// @dev emitted when someone donates
    /// @param from donator's address
    /// @param to creator's address
    /// @param token payment token's address
    /// @param totalAmount amount of tokens sent
    /// @param amountReceived amount of donation after fees
    event Donation(
        address indexed from,
        address indexed to,
        address token,
        uint256 totalAmount,
        uint256 amountReceived
    );

    /// -----------------------------------------------------------------------
    /// OWNER FUNCTIONS
    /// -----------------------------------------------------------------------

    /// @dev Whitelist the particular FT contract
    /// NOTE ETH is represented by address(0)
    /// @param root New merkle tree's root
    function whitelist(bytes32 root) external;

    /// @dev update protocol fees
    /// @param _protocolFees New protocol fees
    function setProtocolFee(uint256 _protocolFees) external;

    /// @dev updated treasury contract
    /// @param _treasury New treasury contract's address
    function setTreasury(address _treasury) external;

    /// -----------------------------------------------------------------------
    /// USER FUNCTIONS
    /// -----------------------------------------------------------------------

    /// @dev function to donate tokens to address "to"
    /// @param token Address of the token being sent
    /// @param amount Amount of tokens sent
    /// @param to Address to which tokens are sent
    function donate(
        address token,
        uint256 amount,
        address to,
        bytes32[] memory proof
    ) external payable;
}
