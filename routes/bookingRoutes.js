const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Tour = require("../models/Tour");

// ================================
// CREATE BOOKING (NO LOGIN)
// ================================
router.post("/", async (req, res) => {
  try {
    const {
      tour,
      customerName,
      customerEmail,
      customerPhone,
      travellers
    } = req.body;

    // ✅ check tour exists
    const tourExists = await Tour.findById(tour);
    if (!tourExists) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    // ✅ create booking
    const booking = await Booking.create({
      tour,
      customerName,
      customerEmail,
      customerPhone,
      travellers
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
