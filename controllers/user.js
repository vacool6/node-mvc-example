const User = require("../models/user");
const { wrapper } = require("../utils/asyncWrapper");

module.exports.getAllUsers = wrapper(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports.getUserById = wrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  await user.greet(user.username);
  res.send({ user: user.username, email: user.email });
});

module.exports.addUser = wrapper(async (req, res, next) => {
  const newUser = new User(req.body);
  await newUser.save();
  newUser.greet(newUser.username);
  res.send("Data added");
});

module.exports.updateUserById = wrapper(async (req, res, next) => {
  const { id } = req.params;
  // await User.updateOne({ _id: id }, { $set: { ...req.body } });
  await User.findByIdAndUpdate(id, { ...req.body });
  res.send("User modified");
});

module.exports.changeAdminForId = wrapper(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  await user.toggleAdmin();
  res.send("Admin status changed!");
});

module.exports.changeAdminForAll = wrapper((req, res) => {
  User.changeAdminRites()
    .then(() => res.send("Changed!"))
    .catch(() => res.send("error"));
});

module.exports.deleteUserById = wrapper(async (req, res) => {
  const { id } = req.params;
  // await User.deleteOne({ _id: id });
  await User.findByIdAndDelete(id);
  res.send("User deleted");
});
