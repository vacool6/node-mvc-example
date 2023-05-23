const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema -> Blueprint
const userSchema = new Schema({
  //Adding validations
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This email is already in use"],
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 10,
  },
  age: {
    type: Number,
    default: null,
    min: [10, "The value cannot be less than 10"],
    max: [60, "The value cannot be  greater than 60"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

// Instance methods
// You cannot use arrow funcs here
userSchema.methods.greet = function (name) {
  console.log(name, "says hello");
};

userSchema.methods.toggleAdmin = function () {
  console.log(this);
  this.isAdmin = !this.isAdmin;
  return this.save();
};

// Statics which works on all the docs
userSchema.statics.changeAdminRites = function () {
  console.log(this);
  return this.updateMany({}, { isAdmin: true });
};

// Creating & exporting model
module.exports = mongoose.model("User", userSchema);
