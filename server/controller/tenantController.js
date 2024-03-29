import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import PropertyModal from "../modals/propertyModal.js";
import TenantModal from "../modals/tenantModal.js";
import HistoryTenantModal from "../modals/historyTenantModal.js";
import { sendSMS } from "../utils/smsHelper.js";

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
    ownerId, // Assuming propertyId is ownerId, adjust as needed
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
  roomTypeData.rooms[roomIndex].details.isAllotted = true; // Assuming there's an isAllotted field
  property.markModified(`roomTypesContainer.roomTypes.${roomType}.rooms`);

  // Save the updated property
  await property.save();

  // const messageToOwner = `A new tenant has been added to room: ${roomTypeData.rooms[roomIndex].name}`;
  // const messageToTenant = `Hi ${newTenant.personalDetails.name}, you have been added as a tenant. Your rent starts from ${newTenant.startDate.toDateString()}`;

  // Send SMS to Owner and Tenant
  // await sendSMS("+918296708008", "Hello Owenr new Message  🚽, messageToOwner");
  // await sendSMS(
  //   "+917008278152",
  //   "Hello Tenant U R GUUUUUUUU  🚽  zakkkkkuuuuuu"
  // );

  res.status(200).json({
    message: "Tenant added and room updated successfully",
    tenant: newTenant,
    roomDetails: roomTypeData.rooms[roomIndex],
  });
});

// @desc Remove a tenant and mark room as vacant
// @route POST /api/tenants/remove/:tenantId
// @access PRIVATE
const removeTenant = asyncHandler(async (req, res) => {
  const { tenantId } = req.params;
  const { endDate } = req.body; // Get endDate from request body
  const ownerId = req.user._id;

  console.log({
    tenantId,
    endDate,
  });

  // Validate endDate if necessary
  if (!endDate) {
    return res.status(400).json({ message: "End date is required" });
  }

  // Find the tenant
  const tenant = await TenantModal.findById(tenantId);
  if (!tenant) {
    return res.status(404).json({ message: "Tenant not found" });
  }

  // Archive tenant details
  const archivedTenantData = {
    ...tenant.toObject(),
    endDate: new Date(endDate), // Use the provided endDate
  };
  const archivedTenant = new HistoryTenantModal(archivedTenantData);
  await archivedTenant.save();

  // Remove tenant from the active tenants list
  await TenantModal.findByIdAndRemove(tenantId);

  // Update room status in property
  const property = await PropertyModal.findOne({ owner: ownerId });
  const roomType = tenant.room.roomType;
  const roomId = tenant.room.roomId;

  const roomTypeData = property.roomTypesContainer.roomTypes.get(roomType);
  const roomIndex = roomTypeData.rooms.findIndex(
    (room) => room._id.toString() === roomId.toString()
    // (room) => console.log(room, " room")
  );

  if (roomIndex !== -1) {
    roomTypeData.rooms[roomIndex].details.isAllotted = false;
    property.markModified(`roomTypesContainer.roomTypes.${roomType}.rooms`);
    await property.save();
  }
  // console.log({
  //   roomType,
  //   roomTypeData,
  //   roomId,
  //   roomIndex,
  //   property,
  // });

  res
    .status(200)
    .json({ message: "Tenant removed and room updated successfully" });
});

// @desc Edit a tenant's details
// @route PATCH /api/tenants/edit/:tenantId
// @access PRIVATE
const editTenant = asyncHandler(async (req, res) => {
  const tenantId = req.params.tenantId;
  const ownerId = req.user._id; // Assuming user is authenticated and ID is available
  const updateData = req.body;

  // Find the tenant by ID and ownerId to ensure the tenant belongs to the logged-in user
  const tenant = await TenantModal.findOne({ _id: tenantId, ownerId });

  if (!tenant) {
    res.status(404).json({ message: "Tenant not found" });
    return;
  }

  // Update tenant details
  Object.assign(tenant, updateData);

  // Save the updated tenant
  await tenant.save();

  // console.log({
  //   tenant,
  //   updateData,
  //   body: req.body,
  // });

  res.status(200).json({
    message: "Tenant updated successfully",
    tenant,
  });
});

// @desc Get all tenants for the logged-in user
// @route GET /api/tenants
// @access PRIVATE
const getAllTenants = asyncHandler(async (req, res) => {
  const ownerId = req.user._id; // Assuming user is authenticated and ID is available

  // Fetch all tenants belonging to the logged-in user's property
  const tenants = await TenantModal.find({ ownerId });

  if (!tenants) {
    res.status(404).json({ message: "No tenants found" });
    return;
  }

  res.status(200).json({
    message: "Tenants fetched successfully",
    tenants,
  });
});

// @desc Get a tenant by ID with room details
// @route GET /api/tenants/getTenantById/:tenantId
// @access PRIVATE
const getTenantByID = asyncHandler(async (req, res) => {
  const tenantId = req.params.tenantId;
  const ownerId = req.user._id; // Assuming user is authenticated and ID is available

  // Find the tenant by ID and ownerId
  const tenant = await TenantModal.findOne({ _id: tenantId, ownerId });
  if (!tenant) {
    res.status(404).json({ message: "Tenant not found" });
    return;
  }

  // Find the property
  const property = await PropertyModal.findOne({ owner: ownerId });
  if (!property) {
    res.status(404).json({ message: "Property not found" });
    return;
  }

  // Extract room type and room ID from the tenant data
  const { roomType, roomId } = tenant.room;

  // Access the specific room type
  const roomTypeData = property.roomTypesContainer.roomTypes.get(roomType);
  if (!roomTypeData) {
    res.status(404).json({ message: `Room type '${roomType}' not found` });
    return;
  }

  // Find the specific room based on roomId
  const roomDetails = roomTypeData.rooms.find(
    (room) => room._id.toString() === roomId.toString()
  );
  if (!roomDetails) {
    res.status(404).json({ message: "Room not found" });
    return;
  }

  console.log({
    roomDetails,
    tenant,
  });

  res.status(200).json({
    message: "Tenant and room details fetched successfully",
    tenant,
    roomDetails,
  });
});

export { addTenant, getAllTenants, editTenant, getTenantByID, removeTenant };
