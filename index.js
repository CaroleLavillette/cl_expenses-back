const express = require("express");
const bodyParser  = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/expenses-app", {useNewUrlParser: true});

const Expense = mongoose.model("Expense", {
    user: {
        type: String,
        default: "",
        unique: true,
        require
    },
    description: {
        type: String,
        default: "",
    },
    amout: {
        type: Number,
        default: 0
    }
});

// ---   CREATE   ---
app.post("/create", async (req, res) => {
    try {
        const newExpense = new Expense({
            user: req.body.user,
            description: req.body.description,
            amout: req.body.amount
        });
        await newExpense.save();
        res.json({message: "New User Created"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// ---   READ   ---
app.get("/", async (req, res) => {
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
app.post("/update", async (req, res) => {
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
app.post("/delete", async (req, res) => {
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

app.listen(3000, () => {
    console.log("Youhou !!! Server Started !");
});