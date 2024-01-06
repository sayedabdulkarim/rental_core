import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  room: {
    roomId: mongoose.Schema.Types.ObjectId,
    roomType: String,
    actualPrice: Number,
    finalPrice: Number,
    name: String,
  },
  advancePayment: Number,
  isElectricPaymentByTenant: {
    type: Boolean,
    default: false,
  },
  personalDetails: {
    name: String,
    fatherName: String,
    numberOfAdults: Number,
    numberOfChildren: Number,
    aadhaarCardNumber: String,
  },
  startDate: {
    type: Date,
    // default: Date.now, // Default to the current date
  },
  endDate: {
    type: Date,
    // No default value, as this would be set when the tenant leaves
  },
  ownerId: mongoose.Schema.Types.ObjectId, // ID of the property to which the tenant belongs
});

const TenantModal = mongoose.model("Tenant", TenantSchema);

export default TenantModal;
