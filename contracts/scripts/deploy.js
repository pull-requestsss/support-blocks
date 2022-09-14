const { ethers } = require("hardhat");
const fs = require("fs");

var crypTea;
var crypTeaProxy;
var crypTeaProxied;

async function main() {

    const CrypTeaProxy = await ethers.getContractFactory("CrypTeaProxy");
    const CrypTea = await ethers.getContractFactory("CrypTea");

    crypTeaProxy = await CrypTeaProxy.deploy();
    crypTeaProxy = await crypTeaProxy.deployed();

    crypTea = await CrypTea.deploy();
    crypTea = await crypTea.deployed();

    console.log(crypTea.address + " " + crypTeaProxy.address);

    await crypTeaProxy.upgradeTo(crypTea.address);
    await delegate();
}

const delegate = async () => {
    const NODE_URL = "https://goerli.infura.io/v3/8ac850d25c714781a6233cd035253301"
    const KEY = fs.readFileSync(".secret").toString().trim();
    console.log(KEY);
    const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
    const signer = new ethers.Wallet(KEY, provider);

    const abi = ["function initialize() public"]
    crypTeaProxied = new ethers.Contract(crypTeaProxy.address, abi, signer);
    await crypTeaProxied.initialize();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
