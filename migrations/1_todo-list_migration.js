// eslint-disable-next-line no-undef
var TodoList = artifacts.require("TodoList");
module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(TodoList);
};
