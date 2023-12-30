import mongoose from "mongoose";

const RoomDetailSchema = new mongoose.Schema({
  picture: String,
  rent: Number,
  description: String,
  equipmentdetails: String,
  isAllotted: {
    type: Boolean,
    default: false,
  },
});

const RoomSchema = new mongoose.Schema({
  name: String,
  details: RoomDetailSchema,
});

const RoomTypeSchema = new mongoose.Schema({
  count: Number,
  rooms: [RoomSchema],
});

const RoomTypeContainerSchema = new mongoose.Schema({
  // Use a Map to hold the room types dynamically
  roomTypes: {
    type: Map,
    of: RoomTypeSchema,
  },
});

const PropertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  roomTypesContainer: RoomTypeContainerSchema,
});

const PropertyModal = mongoose.model("Property", PropertySchema);

export default PropertyModal;
