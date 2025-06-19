import { Main } from "next/document";
import { ethers } from "hardhat";
import { upgrades } from "hardhat";
const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV4 = await ethers.getContractFactory("BoxV4");
  console.log("Preparing upgrade to BoxV4...");
  //并返回其实现地址，而不是代理合约的地址。
  const boxV4Address = await upgrades.prepareUpgrade(proxyAddress, BoxV4);
  console.log(boxV4Address, " BoxV4 implementation contract address");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
