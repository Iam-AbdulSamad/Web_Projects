const { log } = require("console");
const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.DB_URL)
    console.log("Database connected successfully!");
}

module.exports = connectDB;