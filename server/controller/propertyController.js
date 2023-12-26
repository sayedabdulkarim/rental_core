// Assuming you have these models and functions already defined
import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import PropertyModal from "../modals/propertyModal.js";
import { generateToken } from "../utils/generateToken.js";
// Helper function to create room objects based on the count
const createRoomObjects = (count, details) => {
  return Array.from({ length: count }, (_, index) => ({
    name: `Room ${index + 1}`,
    details: details,
  }));
};

// @desc Add room details for a property
// @route POST /api/properties/addrooms
// @access PRIVATE (Assuming only logged-in users can add rooms)
const addRoomDetails = asyncHandler(async (req, res) => {
  const ownerId = req.user._id; // Assuming you have user's info from the auth middleware
  const { roomTypes } = req.body;

  // Find the property by the owner ID or create a new one if it doesn't exist
  let property = await PropertyModal.findOne({ owner: ownerId });

  if (!property) {
    property = new PropertyModal({ owner: ownerId, roomTypes: {} });
  }

  // Iterate over each room type and add rooms based on the count
  Object.keys(roomTypes).forEach((type) => {
    const { count, details } = roomTypes[type];
    property.roomTypes[type] = {
      count,
      rooms: createRoomObjects(count, details),
    };
  });

  await property.save();

  res.status(200).json({
    message: "Room details added successfully",
    property: property,
  });
});

export { addRoomDetails };
