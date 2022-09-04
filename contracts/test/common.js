const { ethers } = require('hardhat');

let crypTeaProxy;
let crypTea;
let accounts;
let ft1; let ft2; let ft3;

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
    accounts: () => accounts,
    fts: () => [ETH, ft1, ft2, ft3],
    _crypTeaProxy: () => crypTeaProxy,
    _crypTea: () => crypTea
}
