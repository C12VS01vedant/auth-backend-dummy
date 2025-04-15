const express = require("express");
const router = express.Router();
const Expense = require("../../models/expense");
const authMiddleware = require("../../utils/auth_middleware");

// ✅ 1. CREATE Expense (POST API)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { category, amount, date } = req.body;
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const expense = new Expense({
      category,
      amount,
      date,
      userId: req.user.id, // Get user ID from authMiddleware
    });

    await expense.save();
    res.status(201).json({ message: "Expense added successfully!", expense });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ 2. GET All Expenses (GET API)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ 3. UPDATE Expense (PUT API)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { category, amount, date } = req.body;

    let expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;

    await expense.save();
    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ 4. DELETE Expense (DELETE API)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
