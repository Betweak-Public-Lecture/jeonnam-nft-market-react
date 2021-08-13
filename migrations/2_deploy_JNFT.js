const JNFT = artifacts.require("JNFT");

module.exports = function (deployer) {
  deployer.deploy(JNFT);
};
