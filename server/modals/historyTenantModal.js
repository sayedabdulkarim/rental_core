import mongoose from "mongoose";

const HistoryTenantSchema = new mongoose.Schema({
  room: {
    roomId: mongoose.Schema.Types.ObjectId,
    roomType: String,
    actualPrice: Number,
    finalPrice: Number,
    name: String,
  },
  advancePayment: Number,
  personalDetails: {
    name: String,
    fatherName: String,
    numberOfAdults: Number,
    numberOfChildren: Number,
    aadhaarCardNumber: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true, // Set as required because this should be set when moving to history
  },
  ownerId: mongoose.Schema.Types.ObjectId,
  // Additional fields can be added here if necessary
});

const HistoryTenantModal = mongoose.model("HistoryTenant", HistoryTenantSchema);

export default HistoryTenantModal;
