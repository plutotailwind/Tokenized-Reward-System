const { expect } = require("chai");

describe("LoyaltyToken", function () {
  let LoyaltyToken, token, owner, user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    LoyaltyToken = await ethers.getContractFactory("LoyaltyToken");
    token = await LoyaltyToken.deploy();
    // No need to call await token.deployed() in Ethers v6
  });

  it("should issue points to a user", async function () {
    await token.issuePoints(user1.address, 100);
    expect(await token.balanceOf(user1.address)).to.equal(100);
  });

  it("should allow users to redeem points", async function () {
    await token.issuePoints(user1.address, 200);
    await token.connect(user1).redeemPoints(50);
    expect(await token.balanceOf(user1.address)).to.equal(150);
  });

  it("should allow users to transfer points", async function () {
    await token.issuePoints(user1.address, 300);
    await token.connect(user1).transferPoints(owner.address, 100);
    expect(await token.balanceOf(owner.address)).to.equal(100);
    expect(await token.balanceOf(user1.address)).to.equal(200);
  });
});
