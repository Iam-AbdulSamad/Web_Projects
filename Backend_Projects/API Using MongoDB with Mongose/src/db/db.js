const mongoose = require("mongoose");

async function ConnectDB() {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Database Successfully connected.");
}

module.exports= ConnectDB