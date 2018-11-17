var Travels = artifacts.require("./TravelsContract.sol");

module.exports = function(deployer) {
 // deployer.deploy(MathLib);
  deployer.deploy(Travels);
 // deployer.deploy(SimpleBank);
};
