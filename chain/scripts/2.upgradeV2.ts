import { BoxV2 } from "./../typechain-types/contracts/BoxV2";
import { ethers } from "hardhat";
import { upgrades } from "hardhat";

const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("upgrade to BoxV2...");
  //update
  const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2);

  const box2ProxyAddress = await boxV2.getAddress();
  console.log(box2ProxyAddress, " BoxV2 address(should be the same)");

  // if you try to get implementation address ，you  found  that the value is 0，
  // cause the data is stored on proxy contract
  //   addressimp = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707'
  // boximp = await ethers.getContractAt("BoxV2", addressimp)

  console.log(
    await upgrades.erc1967.getImplementationAddress(box2ProxyAddress),
    " getImplementationAddress"
  );

  console.log(
    await upgrades.erc1967.getAdminAddress(box2ProxyAddress),
    " getAdminAddress"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
