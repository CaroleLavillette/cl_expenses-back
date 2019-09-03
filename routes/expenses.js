const express = require("express");
const router = express.Router();

const Expense = require("../models/expenses");
const User = require("../models/users");


// ---   CREATE   ---
app.post("/expense/create", async (req, res) => {
    try {
        
        const newExpense = new Expense({
            user: req.body.user,
            description: req.body.description,
            amount: req.body.amount
        });
        await newExpense.save();
        res.json({message: "New User Created"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// ---   READ   ---
app.get("/expense", async (req, res) => {
try {
    if (req.body.id) {
        const expenses = await Expenses.find();
        res.json(expenses);
    }
    } catch (error) {
        res.status(400).json({error: error.message});
}
});

// ---   UPDATE   ---
app.post("/expense/update", async (req, res) => {
    try {
        if (req.body.id) {
            const expense = await Expense.findById(req.body.id);
            expense.description = req.body.description;
            expense.amount = req.body.amount;
            await expense.save();
            res.json({message: "Expense Updated"});
        } else {
            res.status(400).json({message: "Missing Parameter"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// ---   DELETE   ---
app.post("/expense/delete", async (req, res) => {
    try {
        if (req.body.id) {
            const expense = await Expense.findById(req.body.id);
            await expense.remove();
            res.json({message: "Expense Removed"});
        } else {
            res.status(400).json({message: "Missing Id"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;