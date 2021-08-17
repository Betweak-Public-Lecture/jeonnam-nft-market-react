const JNFT = artifacts.require("JNFT");
const JNFTMarket = artifacts.require("JNFTMarket");

module.exports = function (deployer) {
  deployer.deploy(JNFT, JNFTMarket.address);
};
