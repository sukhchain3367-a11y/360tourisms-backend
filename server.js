const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// 🧩 ROUTES IMPORT
const tourRoutes = require("./routes/tourRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

// 🔥 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected 🔥");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌", err);
  });

// 🚏 ROUTES
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("360tourisms backend running 🚀");
});
 //HEALTH CHECK ROUTE
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is healthy 🚀",
    time: new Date()
  });
});
// 🌍 GLOBAL ERROR HANDLER (ALWAYS LAST)
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
