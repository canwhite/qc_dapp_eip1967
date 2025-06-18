import { ethers, upgrades } from "hardhat";

async function main() {
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box...");
  try {
    // 使用 initialize 作为初始化函数
    const box = await upgrades.deployProxy(Box, [42], {
      initializer: "initialize",
    });
    await box.waitForDeployment();
    const proxyAddress = await box.getAddress();
    console.log(proxyAddress, "box (proxy) address");

    const implAddress = await upgrades.erc1967.getImplementationAddress(
      proxyAddress
    );
    console.log(implAddress, "getImplementationAddress");

    const adminAddress = await upgrades.erc1967.getAdminAddress(proxyAddress);
    console.log(adminAddress, "getAdminAddress");
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exitCode = 1;
});
