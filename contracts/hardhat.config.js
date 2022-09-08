require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  gasReporter: {
    coinmarketcap: 'e4a42af2-5983-459b-829f-ac33adc01199',
    currency: 'USD',
    gasPrice: 15
  }, contractSizer: {
    runOnCompile: false
  }
};
