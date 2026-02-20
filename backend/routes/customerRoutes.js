import express from "express";
import Customer from "../models/Customer.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE
router.post("/", protect, async (req, res) => {

  const customer = await Customer.create({
    ...req.body,
    createdBy: req.user.id
  });

  res.json(customer);

});


// READ
router.get("/", protect, async (req, res) => {

  const customers = await Customer.find({
    createdBy: req.user.id
  });

  res.json(customers);

});


// UPDATE
router.put("/:id", protect, async (req, res) => {

  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);

});


// DELETE
router.delete("/:id", protect, async (req, res) => {

  await Customer.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });

});

export default router;