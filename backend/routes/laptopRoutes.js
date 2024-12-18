import express from "express";
import {
  getAllLaptops,
  getLaptop,
  createLaptop,
  deleteLaptop,
  updateLaptop,
} from "../controllers/LaptopController.js";

const router = express.Router();

// GET all laptops
router.get("/", getAllLaptops);

// GET a single laptop
router.get("/:id", getLaptop);

// POST a new laptop
router.post("/", createLaptop);

// DELETE a laptop
router.delete("/:id", deleteLaptop);

// PUT (update) a laptop
router.put("/:id", updateLaptop); // Change from PATCH to PUT here

export default router;
