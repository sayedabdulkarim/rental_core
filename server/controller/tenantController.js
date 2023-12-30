import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import PropertyModal from "../modals/propertyModal.js";
import TenantModal from "../modals/tenantModal.js";

// @desc Add a tenant and mark room as allotted
// @route POST /api/tenants/add
// @access PRIVATE
const addTenant = asyncHandler(async (req, res) => {
  const ownerId = req.user._id; // Assuming user is authenticated and ID is available
  const { tenantDetails, roomType, roomId } = req.body; // tenantDetails includes tenant info

  // Create a new tenant
  const newTenant = new TenantModal({
    ...tenantDetails,
    roomId: roomId,
    roomType: roomType,
    propertyId: ownerId, // Assuming propertyId is ownerId, adjust as needed
  });

  // Save the new tenant
  await newTenant.save();

  // Find the property and update the room status
  const property = await PropertyModal.findOne({ owner: ownerId });
  if (!property) {
    res.status(404).json({ message: "Property not found" });
    return;
  }

  const roomTypeData = property.roomTypesContainer.roomTypes.get(roomType);
  if (!roomTypeData) {
    res.status(404).json({ message: `Room type '${roomType}' not found` });
    return;
  }

  const roomIndex = roomTypeData.rooms.findIndex(
    (room) => room._id.toString() === roomId
  );

  if (roomIndex === -1) {
    res.status(404).json({ message: "Room not found" });
    return;
  }

  // Update the room as allotted
  roomTypeData.rooms[roomIndex].isAllotted = true; // Assuming there's an isAllotted field
  property.markModified(`roomTypesContainer.roomTypes.${roomType}.rooms`);

  // Save the updated property
  await property.save();

  res.status(200).json({
    message: "Tenant added and room updated successfully",
    tenant: newTenant,
    roomDetails: roomTypeData.rooms[roomIndex],
  });
});

export { addTenant };
