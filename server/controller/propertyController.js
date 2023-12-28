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
    property, // Use toObject() to serialize the Map
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

// @desc Get details for a single room of a specific room type
// @route GET /api/properties/roomdetails/:roomType/:roomId
// @access PRIVATE
const getRoomDetails = asyncHandler(async (req, res) => {
  const { roomType, roomId } = req.params;
  const ownerId = req.user._id; // Assuming user is authenticated and ID is available

  // Find the property by the owner ID
  const property = await PropertyModal.findOne({ owner: ownerId });

  if (!property) {
    res.status(404).json({ message: "Property not found" });
    return;
  }

  // Use get() to access the specific room type from the Mongoose Map
  const roomTypeData = property.roomTypesContainer.roomTypes.get(roomType);

  if (!roomTypeData) {
    res.status(404).json({ message: `Room type '${roomType}' not found` });
    return;
  }

  // Find the room with the given ID within the specified room type
  const roomDetails = roomTypeData.rooms.find(
    (room) => room._id.toString() === roomId
  );

  if (!roomDetails) {
    res.status(404).json({ message: "Room not found" });
    return;
  } else {
    res.status(200).json({
      message: "Room details fetched successfully",
      roomDetails,
      roomType,
    });
  }
});

// @desc Update details for a single room of a specific room type
// @route PATCH /api/properties/roomdetails/:roomType/:roomId
// @access PRIVATE
// const updateRoomDetails = asyncHandler(async (req, res) => {
//   const { roomType, roomId } = req.params;
//   const ownerId = req.user._id; // Assuming user is authenticated and ID is available
//   const updateData = req.body; // Data to update the room with

//   // Find the property by the owner ID
//   const property = await PropertyModal.findOne({ owner: ownerId });

//   if (!property) {
//     res.status(404).json({ message: "Property not found" });
//     return;
//   }

//   // Access the specific room type
//   const roomTypeData = property.roomTypesContainer.roomTypes.get(roomType);

//   if (!roomTypeData) {
//     res.status(404).json({ message: `Room type '${roomType}' not found` });
//     return;
//   }

//   // Find the index of the room with the given ID within the specified room type
//   const roomIndex = roomTypeData.rooms.findIndex(
//     (room) => room._id.toString() === roomId
//   );

//   if (roomIndex === -1) {
//     res.status(404).json({ message: "Room not found" });
//     return;
//   }

//   // Update room details at the found index
//   roomTypeData.rooms[roomIndex] = {
//     ...roomTypeData.rooms[roomIndex],
//     ...updateData,
//   };

//   console.log({
//     roomId,
//     roomType,
//     roomTypeData,
//     roomIndex,
//   });
//   // Save the updated property
//   // await property.save();

//   res.status(200).json({
//     message: "Room updated successfully",
//     roomDetails: roomTypeData.rooms[roomIndex],
//   });
// });

const updateRoomDetails = asyncHandler(async (req, res) => {
  const { roomType, roomId } = req.params;
  const ownerId = req.user._id; // Assuming user is authenticated and ID is available
  const updateData = req.body; // Data to update the room with

  // Find the property by the owner ID
  const property = await PropertyModal.findOne({ owner: ownerId });

  if (!property) {
    res.status(404).json({ message: "Property not found" });
    return;
  }

  // Access the specific room type
  const roomTypeData = property.roomTypesContainer.roomTypes.get(roomType);

  if (!roomTypeData) {
    res.status(404).json({ message: `Room type '${roomType}' not found` });
    return;
  }

  // Find the index of the room with the given ID within the specified room type
  const roomIndex = roomTypeData.rooms.findIndex(
    (room) => room._id.toString() === roomId
  );

  if (roomIndex === -1) {
    res.status(404).json({ message: "Room not found" });
    return;
  }

  // Update room details correctly
  const existingRoom = roomTypeData.rooms[roomIndex];
  if (updateData.details) {
    existingRoom.details = { ...existingRoom.details, ...updateData };
  }
  // Optionally, update other top-level room properties here
  // For example, if (updateData.newTopLevelField) existingRoom.newTopLevelField = updateData.newTopLevelField;

  // Save the updated property
  await property.save();

  console.log({
    roomId,
    roomType,
    roomTypeData,
    roomIndex,
    updateData,
  });

  res.status(200).json({
    message: "Room updated successfully",
    roomDetails: existingRoom,
  });
});

export { addRoomDetails, getAllRoomDetails, getRoomDetails, updateRoomDetails };
