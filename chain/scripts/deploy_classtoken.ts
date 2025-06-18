import { ethers } from "hardhat";

async function main() {
  // Parse the initial supply (10000 tokens with 18 decimals)
  const initialSupply = ethers.parseEther("10000.0");

  // Get the contract factory
  const ClassToken = await ethers.getContractFactory("ClassToken");

  // Deploy the contract
  const token = await ClassToken.deploy(initialSupply);

  // 在 ethers.js v6 中，部署操作已经是异步的，不需要显式等待
  // 直接使用 token.target 即可获取部署地址

  // No need for token.deployed() in ethers.js v6
  console.log("ClassToken deployed to:", token.target); // Use .target instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
