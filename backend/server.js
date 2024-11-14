// server.js

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import phoneRoutes from "./routes/phoneRoutes.js";
import laptopRoutes from "./routes/laptopRoutes.js";
import keyboardRoutes from "./routes/keyboardRoutes.js";
import gamesRoutes from "./routes/gameRoutes.js";
import monitorRoutes from "./routes/monitorRoutes.js";
import mouseRoutes from "./routes/MouseRoutes.js";

// Express app
const app = express();

// Middleware
app.use(express.json());

// Cors
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/phones", phoneRoutes);
app.use("/api/laptops", laptopRoutes);
app.use("/api/keyboards", keyboardRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/monitors", monitorRoutes);
app.use("/api/mice", mouseRoutes);

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
