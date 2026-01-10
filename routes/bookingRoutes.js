const express = require("express");
const Booking = require("../models/Booking");
const Tour = require("../models/Tour");

const router = express.Router();

// 🟢 CREATE BOOKING (GUEST)
router.post("/", async (req, res, next) => {
  try {
    const {
      tour,
      customerName,
      customerEmail,
      customerPhone,
      travellers
    } = req.body;

    // Check tour exists
    const tourExists = await Tour.findById(tour);
    if (!tourExists) {
      res.status(404);
      throw new Error("Tour not found");
    }

    const booking = await Booking.create({
      tour,
      customerName,
      customerEmail,
      customerPhone,
      travellers
    });

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
});


// 🟢 MARK BOOKING AS PAID (MOCK PAYMENT)  🔥 YAHAN PASTE
router.put("/:id/pay", async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    booking.paymentStatus = "paid";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
      booking
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
