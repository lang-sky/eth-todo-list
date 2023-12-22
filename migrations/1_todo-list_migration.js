// eslint-disable-next-line no-undef
var Todos = artifacts.require("TodoList");
module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Todos);
};
