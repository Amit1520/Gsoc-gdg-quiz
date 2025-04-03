require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.20",
    networks: {
      sepolia: {
        url: "https://eth-sepolia.g.alchemy.com/v2/SJmLG0lA7dLxcW_CudmesEizhQmsT9w1", // Use an RPC provider
        accounts: [`0x${process.env.PRIVATE_KEY}`],
        chainId: 11155111,  // Sepolia Chain ID
      },
    }
  };
  
