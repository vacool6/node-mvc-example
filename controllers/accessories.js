const { wrapper } = require("../utils/asynWrapper");
const Accessory = require("../models/accessories");

module.exports.getAllAccessories = wrapper(async (req, res) => {
  const allAccessories = await Accessory.find();
  res.send(allAccessories);
});

module.exports.getById = wrapper(async (req, res) => {
  const { id } = req.params;
  const accessory = await Accessory.findById(id);
  res.send(accessory);
});
