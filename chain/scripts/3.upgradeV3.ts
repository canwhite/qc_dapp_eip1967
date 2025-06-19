import { Main } from "next/document";
//todo,deploy
import { ethers } from "hardhat";
import { upgrades } from "hardhat";

const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV3 = await ethers.getContractFactory("BoxV3");
  console.log("upgrade to BoxV3...");
  const boxV3 = await upgrades.upgradeProxy(proxyAddress, BoxV3);
  const boxV3Address = await boxV3.getAddress();
  console.log(boxV3Address, " BoxV3 address(should be the same)");

  console.log(
    await upgrades.erc1967.getImplementationAddress(boxV3Address),
    " getImplementationAddress"
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(boxV3Address),
    " getAdminAddress"
  );
  // 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  BoxV3 address(should be the same)
  // 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853  getImplementationAddress
  // 0xCafac3dD18aC6c6e92c921884f9E4176737C052c  getAdminAddress
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
