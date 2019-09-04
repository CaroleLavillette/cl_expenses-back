const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser  = require("body-parser");

const User = require("../models/users");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ---   CREATE   ---
app.post("/user/create", cors(), async (req, res) => {
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
app.get("/user", cors(), async (req, res) => {
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
app.post("/user/update", cors(), async (req, res) => {
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
app.post("/user/delete", cors(), async (req, res) => {
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