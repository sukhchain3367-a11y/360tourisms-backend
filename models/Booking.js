const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // 🎒 Selected Tour
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true
    },

    // 👤 Guest User Details (NO LOGIN)
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

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },

    city: {
      type: String
    },

    // 👥 Booking Info
    travellers: {
      type: Number,
      default: 1,
      min: [1, "At least 1 traveller required"]
    },

    totalAmount: {
      type: Number,
      required: true
    },

    // 💳 Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
