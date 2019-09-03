const express = require("express");
const router = express.Router();

const User = require("../models/user");


// ---   CREATE   ---
app.post("/user/create", async (req, res) => {
    try {
        const newUser = new User({
            user: req.body.user,
        });
        await newUser.save();
        res.json({message: "New User Created"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// ---   READ   ---
app.get("/user", async (req, res) => {
try {
    if (req.body.id) {
        const users = await User.find();
        res.json(users);
    }
    } catch (error) {
        res.status(400).json({error: error.message});
}
});

// ---   UPDATE   ---
app.post("/user/update", async (req, res) => {
    try {
        if (req.body.id) {
            const user = await User.findById(req.body.id);
            user.userName = req.body.userName
            await user.save();
            res.json({message: "User Updated"});
        } else {
            res.status(400).json({message: "Missing Parameter"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// ---   DELETE   ---
app.post("/user/delete", async (req, res) => {
    try {
        if (req.body.id) {
            const user = await User.findById(req.body.id);
            await user.remove();
            res.json({message: "User Removed"});
        } else {
            res.status(400).json({message: "Missing Id"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;