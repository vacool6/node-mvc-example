const { wrapper } = require("../utils/asynWrapper");
const User = require("../models/user");
const Vehicle = require("../models/vehicle");
const Accessory = require("../models/accessories");
const ObjectID = require("bson-objectid");

module.exports.getAllVehicles = wrapper(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const vehicleList = [];
  for (let i of user.vehicles) {
    const foundVehicle = await Vehicle.findById(i);
    console.log(foundVehicle);
    vehicleList.push(foundVehicle);
  }
  res.send(vehicleList);
});

module.exports.addVehicle = wrapper(async (req, res) => {
  const { userId } = req.params;
  const { accessories } = req.body;
  const user = await User.findById(userId);
  const newVehicle = new Vehicle(req.body);
  const accessoriesList = [];
  for (let i of accessories) {
    const part = await Accessory.find({ name: i.name });
    if (part.length !== 0) {
      part[0].usedIn.push(newVehicle._id);
      accessoriesList.push(part[0]);
      await part[0].save();
    } else {
      const newAccessory = new Accessory(i);
      newAccessory.usedIn.push(newVehicle._id);
      accessoriesList.push(newAccessory);
      await newAccessory.save();
    }
  }
  newVehicle.owner = user._id;
  newVehicle.accessories = accessoriesList;
  user.vehicles.push(newVehicle);
  await newVehicle.save();
  await user.save();
  res.send(`Vehicle added to ${user.username}`);
});

module.exports.updateVehicleById = wrapper(async (req, res) => {
  const { vehicleId } = req.params;
  await Vehicle.findByIdAndUpdate(vehicleId, { ...req.body });
  res.send("Vehicle updated!");
});

module.exports.deleteVehicleById = wrapper(async (req, res) => {
  const { userId, vehicleId } = req.params;
  await User.findByIdAndUpdate(userId, { $pull: { vehicles: vehicleId } });
  const accessories = await Accessory.find();

  for (let i of accessories) {
    const updatedAccessories = [];
    for (let j of i.usedIn) {
      if (ObjectID(j).valueOf() !== vehicleId) {
        updatedAccessories.push(j);
      }
    }
    i.usedIn = updatedAccessories;
    await i.save();
  }
  await Vehicle.findByIdAndDelete(vehicleId);
  res.send("Vehicle deleted!");
});
