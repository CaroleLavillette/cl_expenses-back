const express = require("express");
const bodyParser  = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/expenses-app", {useNewUrlParser: true});
/* mongoose.connect(
    "mongodb://localhost/expenses-app",{ useNewUrlParser: true }
  ); */
let port = process.env.PORT || 3007;

const Expense = require("./models/expenses");
const User = require("./models/users")

const userRoute = require("./routes/user")
const expenseRoute = require ("./routes/expenses")

app.use(userRoute);
app.use(expenseRoute);

app.listen(3007, () => {
    console.log("Server Started");
});