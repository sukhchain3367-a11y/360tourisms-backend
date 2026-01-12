const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// 🟢 ADD TO CART
router.post("/", async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({
      success: true,
      cart
    });
  } catch (error) {
    next(error);
  }
});

// 🟢 GET CART BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("items.tour");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
