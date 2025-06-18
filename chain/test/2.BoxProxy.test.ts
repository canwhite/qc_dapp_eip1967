import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";

describe("Box (proxy)", function () {
  let box: Contract;

  before(async function () {
    const Box = await ethers.getContractFactory("Box");
    // 初始化 box 变量，注意去掉 const
    box = await upgrades.deployProxy(Box, [42], { initializer: "initialize" });
    await box.waitForDeployment(); // 确保部署完成
    console.log("Box deployed to:", await box.getAddress());
  });

  it("should retrieve value previously stored", async function () {
    expect(await box.retrieve()).to.equal(42); // 验证初始值
    await box.store(100); // 更新值
    expect(await box.retrieve()).to.equal(100); // 验证新值
  });
});
