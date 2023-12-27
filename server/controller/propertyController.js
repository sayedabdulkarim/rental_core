// Assuming you have these models and functions already defined
import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import PropertyModal from "../modals/propertyModal.js";
import { generateToken } from "../utils/generateToken.js";
// Helper function to create room objects based on the count
const createRoomObjects = (count, details) => {
  console.log({
    count,
    details,
  });
  return Array.from({ length: count }, (_, index) => ({
    name: `Room ${index + 1}`,
    details: details,
  }));
};

// @desc Add room details for a property
// @route POST /api/properties/addrooms
// @access PRIVATE (Assuming only logged-in users can add rooms)
const addRoomDetails = asyncHandler(async (req, res) => {
  const ownerId = req.user._id; // From auth middleware
  const { roomTypes } = req.body;

  let property = await PropertyModal.findOne({ owner: ownerId });

  if (!property) {
    property = new PropertyModal({
      owner: ownerId,
      roomTypesContainer: { roomTypes: new Map() }, // Initialize as a Map
    });
  } else {
    if (!property.roomTypesContainer) {
      property.roomTypesContainer = { roomTypes: new Map() }; // Initialize as a Map if not present
    }
  }

  Object.keys(roomTypes).forEach((type) => {
    const { count, details } = roomTypes[type];
    const rooms = createRoomObjects(count, details);
    property.roomTypesContainer.roomTypes.set(type, { count, rooms }); // Use .set() for Map
  });

  // Inform Mongoose that the Map field has changed
  property.markModified("roomTypesContainer.roomTypes");

  await property.save();

  res.status(200).json({
    message: "Room details added successfully",
    property: property.toObject({ getters: true }), // Use toObject() to serialize the Map
  });
});

// @desc Get all room details for a property
// @route GET /api/properties/roomdetails
// @access PRIVATE (Assuming only logged-in users can view their rooms)
const getAllRoomDetails = asyncHandler(async (req, res) => {
  const ownerId = req.user._id; // From auth middleware

  // Find the properties by the owner ID
  const properties = await PropertyModal.find({ owner: ownerId });

  // If no properties are found, return an empty array
  if (!properties) {
    return res
      .status(200)
      .json({ message: "No room details found", roomDetails: [] });
  }

  // Transform the properties to include the room details
  const roomDetails = properties.map((property) => {
    // Convert any Maps to objects
    const roomTypes = {};
    property.roomTypesContainer.roomTypes.forEach((value, key) => {
      roomTypes[key] = value.toObject({ getters: true });
    });

    return {
      ...property.toObject(),
      roomTypesContainer: {
        ...property.roomTypesContainer.toObject(),
        roomTypes,
      },
    };
  });

  res.status(200).json({
    message: "Room details retrieved successfully",
    roomDetails,
  });
});

export { addRoomDetails, getAllRoomDetails };
