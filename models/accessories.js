const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessoriesSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  avgCost: {
    type: Number,
    required: true,
  },
  usedIn: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],
});

module.exports = mongoose.model("Accessories", accessoriesSchema);
