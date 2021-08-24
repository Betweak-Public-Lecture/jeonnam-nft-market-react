const NFTSimple = artifacts.require("NFTSimple");

module.exports = function (deployer) {
  deployer.deploy(NFTSimple);
};
