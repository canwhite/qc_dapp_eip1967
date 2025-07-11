import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";

describe("Box (proxy) V2", function () {
  let box: Contract;
  let boxV2: Contract;

  before(async function () {
    const Box = await ethers.getContractFactory("Box");
    // 初始化 box 变量，注意去掉 const
    box = await upgrades.deployProxy(Box, [42], { initializer: "initialize" });
    await box.waitForDeployment(); // 确保部署完成
    console.log("Box deployed to:", await box.getAddress());

    // console.log(box.address," box/proxy")
    // console.log(await upgrades.erc1967.getImplementationAddress(box.address)," getImplementationAddress")
    // console.log(await upgrades.erc1967.getAdminAddress(box.address), " getAdminAddress")

    //updateProxy
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    boxV2 = await upgrades.upgradeProxy(await box.getAddress(), BoxV2);
    // console.log(boxV2.address," box/proxy after upgrade")
    // console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address)," getImplementationAddress after upgrade")
    // console.log(await upgrades.erc1967.getAdminAddress(boxV2.address)," getAdminAddress after upgrade")
  });

  it("should retrieve value previously stored and increment correctly", async function () {
    //这里boxVe继承了42这个值
    expect(await boxV2.retrieve()).to.equal(42);

    await boxV2.increment();
    //result = 42 + 1 = 43
    expect(await boxV2.retrieve()).to.equal(43);

    await boxV2.store(100);
    expect(await boxV2.retrieve()).to.equal(100);
  });
});
