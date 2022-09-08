const { ethers } = require('hardhat');

let crypTeaProxy;
let crypTea;
let accounts;
let ft1; let ft2; let ft3;
let crypTeaProxied;

const ETH = "0x0000000000000000000000000000000000000000";

const deploy = async () => {
    accounts = await ethers.getSigners(4);
    const CrypTeaProxy = await ethers.getContractFactory("CrypTeaProxy");
    const CrypTea = await ethers.getContractFactory("CrypTea");

    crypTeaProxy = await CrypTeaProxy.deploy();
    crypTeaProxy = await crypTeaProxy.deployed();

    crypTea = await CrypTea.deploy();
    crypTea = await crypTea.deployed();
}

const getProxiedCrypTea = async () => {
    const abi = ["function initialize() public",
        "function whitelist(bytes32 root) external",
        "function setProtocolFee(uint256 _protocolFees) external",
        "function setTreasury(address _treasury) external",
        "function donate(address token,uint256 amount,address to,bytes32[] proof) external payable",
        "function owner() public view returns (address)",
        "function treasury() public view returns (address)",
        "function protocolFees() public view returns (uint256)",
        "function whitelistRoot() public view returns (bytes32)"
    ];
    crypTeaProxied = new ethers.Contract(crypTeaProxy.address, abi, accounts[0]);
}

const deployMockFTs = async () => {
    const FT = await ethers.getContractFactory("FT");

    ft1 = await FT.deploy();
    ft1 = await ft1.deployed();

    ft2 = await FT.deploy();
    ft2 = await ft2.deployed();

    ft3 = await FT.deploy();
    ft3 = await ft3.deployed();
}

const mintFT = async (ft, amount, to, from) => {
    await ft.connect(from).mint(to.address, amount);
}

const approveFT = async (ft, amount, from) => {
    await ft.connect(from).approve(crypTea.address, amount);
}

module.exports = {
    initialize: deploy,
    deployFTs: deployMockFTs,
    mintFT: mintFT,
    approveFT: approveFT,
    getProxiedCrypTea: getProxiedCrypTea,
    accounts: () => accounts,
    fts: () => [ETH, ft1, ft2, ft3],
    _crypTeaProxy: () => crypTeaProxy,
    _crypTea: () => crypTea,
    _crypTeaProxied: () => crypTeaProxied
}
