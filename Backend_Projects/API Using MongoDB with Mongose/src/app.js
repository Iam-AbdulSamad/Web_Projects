const express = require('express');
const UserModel = require('./models/usersModle');

const app = express();
app.use(express.json())

// get all users
app.get("/users", async (req, res) => {
    const data = await UserModel.find()
    res.status(200).json({
        meassage: "Data fetched Succesfull",
        body: data 
    })
})

// get user by id
app.post("/user", async (req, res) => {
    const data = req.body;
    console.log(data);
    await UserModel.create({
        name : data.Name,
        age: data.Age,
        email: data.email,
        IsActive: data.IsActive,
    })
    res.status(201).json({
        meassage: "User Succesfully Added.",
    })
})

// delete user by id
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    await UserModel.findOneAndDelete({
        _id : id
    })
    res.status(200).json({
        message: "User deleted successfully"
    })
})

// update user by id
app.patch("/users/:id", async(req, res) => {
    const id = req.params.id;
    const data = req.body
    await UserModel.findOneAndUpdate({
        _id : id
    },
    {
        name: data.Name,
        email: data.email,
    })
    res.status(200).json({
        meassage: "User Updated successfully"
    })
    
})
    
    
module.exports = app;