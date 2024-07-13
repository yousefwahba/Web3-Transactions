
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const {
  MetaMask_PRIVTE_KEY,
  SEPOLIA_URL
}= process.env

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [MetaMask_PRIVTE_KEY],
    },
  },
};
