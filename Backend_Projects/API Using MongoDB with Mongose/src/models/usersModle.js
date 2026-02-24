const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        null: false,
    },
    age: {
        type: Number,
        length: 2,
        null: false,
    },
    email: {
        length: 10,
        type: String,
        unique: true,
        null: false
    },
    IsActive : Boolean,
})


const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel