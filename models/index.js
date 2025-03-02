const User = require("./User");
const Case = require("./Case");
const Bidding = require("./Bidding");

const models = { User, Case, Bidding };

(() => {
  try {
    Object.values(models).forEach((model) => {
      if (model.associate) {
        model.associate(models);
      }
    });
  } catch (error) {
    console.error("Error initializing models:", error);
    throw error;
  }
})();

module.exports = models;
