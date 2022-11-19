import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { AllowList__factory } from "../typechain-types";

describe("AllowList", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAllowList() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const allowList = await new AllowList__factory(owner).deploy();
    await allowList.deployed();

    return { owner, otherAccount, allowList };
  }

  it("Should able to setAllow by owner", async function () {
    const { owner, otherAccount, allowList } = await loadFixture(
      deployAllowList
    );

    {
      await allowList.setAllow(otherAccount.address, true);
      const allow = await allowList.allows(otherAccount.address);
      expect(allow).to.be.true;
    }

    {
      await allowList.setAllow(otherAccount.address, false);
      const allow = await allowList.allows(otherAccount.address);
      expect(allow).to.be.false;
    }
  });

  it("Should not able to setAllow by other", async function () {
    const { otherAccount, allowList } = await loadFixture(deployAllowList);

    await expect(
      allowList.connect(otherAccount).setAllow(otherAccount.address, true)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Encode allows", async function () {
    const { otherAccount, allowList } = await loadFixture(deployAllowList);
    const data = allowList.interface.encodeFunctionData("allows", [
      otherAccount.address,
    ]);
    console.log('data', data);
    console.log('account', otherAccount.address)

    const gas = await allowList.estimateGas.allows(otherAccount.address)
    console.log('gas', gas.toNumber())

    const resultTrue = allowList.interface.encodeFunctionResult("allows", [true]);
    console.log('result true', resultTrue)

    const resultFalse = allowList.interface.encodeFunctionResult("allows", [false]);
    console.log('result false', resultFalse)
  });
});
