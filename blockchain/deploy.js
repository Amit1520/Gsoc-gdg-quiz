const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts from:", deployer.address);

    // Deploy EduToken contract
    const EduToken = await ethers.getContractFactory("EduToken");
    const eduToken = await EduToken.deploy(deployer.address);
    await eduToken.waitForDeployment();
    const eduTokenAddress = await eduToken.getAddress();
    console.log("EduToken deployed at:", eduTokenAddress);

    // Deploy PremiumAccess contract
    const PremiumAccess = await ethers.getContractFactory("PremiumAccess");
    const premiumAccess = await PremiumAccess.deploy(eduTokenAddress); // Pass EduToken address
    await premiumAccess.waitForDeployment();
    const premiumAccessAddress = await premiumAccess.getAddress();
    console.log("PremiumAccess deployed at:", premiumAccessAddress);

    // ✅ Load ABIs from compiled artifacts
    const eduTokenABI = require("../artifacts/contracts/EduToken.sol/EduToken.json").abi;
    const premiumAccessABI = require("../artifacts/contracts/PremiumAccess.sol/PremiumAccess.json").abi;

    // ✅ Correct path to `constants.js`
    const filePath = path.join(__dirname, "../src/utils/constants.js");

    // ✅ Format contract data properly
    const contractData = `
// Auto-generated contract addresses & ABIs

export const EDU_TOKEN_ADDRESS = "${eduTokenAddress}";
export const EDU_TOKEN_ABI = ${JSON.stringify(eduTokenABI, null, 2)};

export const PREMIUM_ACCESS_ADDRESS = "${premiumAccessAddress}";
export const PREMIUM_ACCESS_ABI = ${JSON.stringify(premiumAccessABI, null, 2)};
    `;

    // ✅ Save contract addresses & ABIs to constants.js
    fs.writeFileSync(filePath, contractData.trim());
    console.log(`✅ Contract addresses and ABIs saved to: ${filePath}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
