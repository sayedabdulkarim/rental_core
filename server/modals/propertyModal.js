const mongoose = require("mongoose");

const RoomDetailSchema = new mongoose.Schema({
  picture: String,
  rent: Number,
  description: String,
  equipmentDetails: String,
});

const RoomSchema = new mongoose.Schema({
  name: String,
  details: RoomDetailSchema,
});

const RoomTypeSchema = new mongoose.Schema({
  count: Number,
  rooms: [RoomSchema],
});

const PropertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  roomTypes: {
    "1rk": RoomTypeSchema,
    "1bhk": RoomTypeSchema,
    "2bhk": RoomTypeSchema,
    // ... add other room types if necessary
  },
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
