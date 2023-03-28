const mongoose = require("mongoose");

const apiSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

const fileSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const phoneSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("File", fileSchema);
const Api = mongoose.model("Api", apiSchema);
const User = mongoose.model("User", userSchema);
const Phone = mongoose.model("Phone", phoneSchema);

module.exports = { File, Api, User, Phone };
