const express = require("express");
const connectDB = require("./db/db")
const UserModel = require("./models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cors()); 

app.post("/signup", async(req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    if (email && password) {
        const hash_password = await bcrypt.hash(password, 10);
        try {
            await UserModel.create({
                email: email,
                password: hash_password
            })
            res.status(201).json({ msg: "User created successfully!" });
        } catch (error) {
            res.status(500).json({ msg: "Error creating user!" });
        }
    }
    else {
        res.status(400).json({ msg: "Please provide email and password!" });
    }
});

app.post("/login", async(req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({email})
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({email: user.email}, process.env.SECRET_KEY, { expiresIn: "1h" });
            res.status(200).json({ msg: "Login succesfull", token: token })
        }
        else {
            res.status(401).json({ msg: "Incorrect Mail or Password" });
        }
    }
    else {
        res.status(404).json({ msg: "No Account Found" });
    }
});

app.listen(process.env.PORT || 3000, async () => {
    await connectDB()
    console.log(`http://localhost:${process.env.PORT}`);
})
