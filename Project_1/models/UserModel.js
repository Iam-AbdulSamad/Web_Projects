const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        null: false,
        unique: true
    },
    password: {
        type: String,
        null: false
    }
})

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel 