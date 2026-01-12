const express = require("express");
const Tour = require("../models/Tour");

const router = express.Router();

/* ================================
   CREATE TOUR
================================ */
router.post("/", async (req, res, next) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    next(error);
  }
});

/* ================================
   GET ALL TOURS 
   (Pagination + Search + Filter + Sort)
================================ */
router.get("/", async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Search
    let query = {};
    if (req.query.search) {
      query = {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { location: { $regex: req.query.search, $options: "i" } }
        ]
      };
    }

    // Price filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Sorting
    const sort = req.query.sort || "-createdAt";

    const tours = await Tour.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalTours = await Tour.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalTours / limit),
      totalTours,
      data: tours
    });
  } catch (error) {
    next(error);
  }
});

/* ================================
   GET SINGLE TOUR BY ID
================================ */
router.get("/:id", async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    next(error);
  }
});

/* ================================
   UPDATE TOUR BY ID
================================ */
router.put("/:id", async (req, res, next) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(updatedTour);
  } catch (error) {
    next(error);
  }
});

/* ================================
   DELETE TOUR BY ID
================================ */
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
