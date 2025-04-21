require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/xMPP3WRFycJNTFanacEcPbM-AOV-ffEq",
      accounts: ["72941058aa324c7d0e5f71b377a9c1711d66472f8b77d9f9e02117f879504b5a"]
    }
  }
};
