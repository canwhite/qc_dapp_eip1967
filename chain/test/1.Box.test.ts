import { BigNumber } from "module";
import { expect } from "chai";
import { ethers } from "hardhat"; // 确保从 hardhat 导入 ethers

// normal deploy
describe("Box", () => {
  let box: ethers.Contract;

  before(async () => {
    const Box = await ethers.getContractFactory("Box");
    box = await Box.deploy();
    console.log("Box contract deployed to:", box.target);
  });

  it("should retrieve value previously stored", async function () {
    await box.store(42);
    // 使用 ethers.BigNumber 替代直接使用 BigNumber
    expect(await box.retrieve()).to.equal(42);

    await box.store(100);
    expect(await box.retrieve()).to.equal(100);
  });
});
