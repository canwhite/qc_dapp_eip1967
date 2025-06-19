import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract, BigNumber } from "ethers";

//TODO
import { BoxV3 } from "./../typechain-types/contracts/BoxV3";
import { Box } from "./../typechain-types/contracts/Box";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract, BigNumber } from "ethers";

describe("Box (proxy) V4 with getName", () => {
  let box: Contract;
  let boxV2: Contract;
  let boxV3: Contract;
  let boxV4: Contract;

  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box");
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    const BoxV3 = await ethers.getContractFactory("BoxV3");
    const BoxV4 = await ethers.getContractFactory("BoxV4");

    //initialize with 42
    box = await upgrades.deployProxy(Box, [42], { initializer: "initialize" });
    //initial proxy address
    let proxyAddress = await box.getAddress();

    boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2);
    boxV3 = await upgrades.upgradeProxy(proxyAddress, BoxV3);
    boxV4 = await upgrades.upgradeProxy(proxyAddress, BoxV4);
  });
  //items
  it("should retrieve value previously stored and increment correctly", async () => {
    expect(await boxV2.retrieve()).to.equal(42);
    await boxV3.increment();
    expect(await boxV3.retrieve()).to.equal(43);

    await boxV2.store(100);
    expect(await boxV2.retrieve()).to.equal(100);
  });
  it("should set name correctly and getName correctly in V4", async () => {
    expect(boxV4.name).to.be.undefined;
    expect(await boxV4.getName()).to.equal("Name: ");

    const boxname = "my Box V4";
    await boxV4.setName(boxname);
    expect(await boxV4.getName()).to.equal("Name: " + boxname);
  });
});
