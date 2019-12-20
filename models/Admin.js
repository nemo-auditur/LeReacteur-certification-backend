const mongoose = require("mongoose");

const Admin = mongoose.model("Admin", {
  email: {
    type: String,
    default: ""
  },
  token: {
    type: String,
    default: ""
  },
  salt: {
    type: String,
    default: ""
  },
  hash: {
    type: String,
    default: ""
  }
});

module.exports = Admin;
