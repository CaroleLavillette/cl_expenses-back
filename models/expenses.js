const mongoose = require("mongoose");

const Expense = mongoose.model("Expense", {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description: {
        type: String,
        default: "",
    },
    amount: {
        type: Number,
        default: 0
    }
});

module.exports = Expense;
