const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true
    },

    customerName: {
      type: String,
      required: [true, "Customer name is required"]
    },

    customerEmail: {
      type: String,
      required: [true, "Customer email is required"]
    },

    customerPhone: {
      type: String,
      required: [true, "Customer phone is required"]
    },

    travellers: {
      type: Number,
      default: 1,
      min: [1, "At least 1 traveller required"]
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
