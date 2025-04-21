const { ethers } = require("hardhat");

async function main() {
  const LoyaltyToken = await ethers.getContractFactory("LoyaltyToken");
  const loyaltyToken = await LoyaltyToken.deploy();

  await loyaltyToken.waitForDeployment(); // 🔥 New syntax instead of `.deployed()`

  console.log("LoyaltyToken deployed to:", await loyaltyToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
