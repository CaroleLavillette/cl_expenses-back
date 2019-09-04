const express = require("express");
const bodyParser  = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost/expenses-app", {useNewUrlParser: true});

const User = mongoose.model("User", {
    userName: {
        type: String,
        default:"",
        require
    }
});

// **Create**
app.post("/user/create", async(req,res) => {
    try {
        const newUser = new User({
            userName: req.body.userName
        });
        await newUser.save();
        res.json({message: "New user Created"});
    } catch (error) {
res.status(400).json({error:error.message});
    }
})

// **Read**


// **Update**


// **Delete**

app.listen(3007, () => {
    console.log("Server Started")
})