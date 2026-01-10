const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tour title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"]
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"]
    },

    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 4
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
