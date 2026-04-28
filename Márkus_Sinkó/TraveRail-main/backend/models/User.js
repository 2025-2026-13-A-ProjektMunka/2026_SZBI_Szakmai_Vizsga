const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    keresztNev: {
      type: String,
      required: true,
    },
    vezetekNev: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    jelszo: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
