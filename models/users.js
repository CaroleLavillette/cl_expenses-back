const mongoose = require("mongoose")

const User = mongoose.model("User", {
    userName: {
        type: String,
        default:""
    }})

    module.exports = User;