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

  it("Should able to addAllowList/removeAllowList by owner", async function () {
    const { owner, otherAccount, allowList } = await loadFixture(
      deployAllowList
    );

    {
      await allowList.addAllowlist(otherAccount.address);
      const allow = await allowList.allowlists(otherAccount.address);
      expect(allow).to.be.true;
    }

    {
      await allowList.removeAllowlist(otherAccount.address);
      const allow = await allowList.allowlists(otherAccount.address);
      expect(allow).to.be.false;
    }
  });

  it("Should not able to addAllowList/removeAllowList by other", async function () {
    const { otherAccount, allowList } = await loadFixture(deployAllowList);

    await expect(
      allowList.connect(otherAccount).addAllowlist(otherAccount.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");

    await expect(
      allowList.connect(otherAccount).removeAllowlist(otherAccount.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
