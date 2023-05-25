const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseYr: Number,
  accessories: [{ type: Schema.Types.ObjectId, ref: "Accessories" }],
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
