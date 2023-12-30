import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  room: {
    roomId: mongoose.Schema.Types.ObjectId,
    roomType: String,
    actualPrice: Number,
    finalPrice: Number,
  },
  advancePayment: Number,
  personalDetails: {
    name: String,
    fatherName: String,
    numberOfAdults: Number,
    numberOfChildren: Number,
    aadhaarCardNumber: String,
    // You might want to store Aadhaar Card number securely
  },
  ownerId: mongoose.Schema.Types.ObjectId, // ID of the property to which the tenant belongs
  // Add any additional fields here as needed
});

const TenantModal = mongoose.model("Tenant", TenantSchema);

export default TenantModal;
