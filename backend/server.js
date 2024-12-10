import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Route imports
import phoneRoutes from "./routes/phoneRoutes.js";
import laptopRoutes from "./routes/laptopRoutes.js";
import keyboardRoutes from "./routes/keyboardRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import monitorRoutes from "./routes/monitorRoutes.js";
import mouseRoutes from "./routes/mouseRoutes.js";

// Express app initialization
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Logger Middleware
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request to ${req.path}`
  );
  next();
});

// API Routes
app.use("/api/phones", phoneRoutes);
app.use("/api/laptops", laptopRoutes);
app.use("/api/keyboards", keyboardRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/monitors", monitorRoutes);
app.use("/api/mice", mouseRoutes);
app.use("/api/games/category", gameRoutes); // Ensure gameRoutes supports category filtering

// Database connection and server start
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });
