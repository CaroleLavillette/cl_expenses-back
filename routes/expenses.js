const express = require("express");
const router = express.Router();
const cors = require("cors");
const Expense = require("../models/expenses");
const bodyParser  = require("body-parser");

router.use(cors());

// ---   CREATE   ---
router.post("/expense/create", cors(), async (req, res) => {
    try {
        
        const newExpense = new Expense({
            user: req.body.user,
            description: req.body.description,
            amount: req.body.amount
        });
        await newExpense.save();
        res.json({message: "New expense created"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// ---   READ   ---
router.get("/expense", cors(), async (req, res) => {
try {
    
        const expenses = await Expense.find();
        res.json(expenses);
    
    } catch (error) {
        res.status(400).json({error: error.message});
}
});

// ---   UPDATE   ---
router.post("/expense/update", cors(), async (req, res) => {
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
router.post("/expense/delete", cors(), async (req, res) => {
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