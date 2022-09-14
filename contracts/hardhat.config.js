require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-etherscan");

const fs = require('fs');
const GOERLI_PRIVATE_KEY = fs.readFileSync(".secret").toString().trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  gasReporter: {
    coinmarketcap: 'e4a42af2-5983-459b-829f-ac33adc01199',
    currency: 'USD',
    gasPrice: 15
  }, contractSizer: {
    runOnCompile: false
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/8ac850d25c714781a6233cd035253301`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "H387UBBD7MTT6IRJFZ2JWUCAKE1S9EN33J"
  }
};
