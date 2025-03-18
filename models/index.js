const User = require("./User");
const Case = require("./Case");
const Bidding = require("./Bidding");
const Feedback = require("./Feedback");

const models = { User, Case, Bidding, Feedback };

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
