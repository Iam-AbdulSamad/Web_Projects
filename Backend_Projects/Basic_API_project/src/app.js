const express = require("express")

const app = express();
app.use(express.json());

let users = []; 

// define routes for CRUD operations on users
app.get("/", (req, res) => {
    res.send("This is basic project on CRUD operations ")
})

// get all users
app.get("/user", (req, res) => {
    res.json(users)
})

// get user by index
app.get("/user/:index", (req, res) => {
    const index = req.params.index
    if (index < users.length && index >= 0) {
        res.json(users[index])
    }
    else {
        res.json({
            message: "Invalid index"
        })
    }
    
})

// create a new user
app.post("/user", (req, res) => {
    users.push(req.body)
    res.status(201).json({
        message: "User added succesfull"
    })
})

// update user by index
app.patch("/user/:index", (req, res) => {
    const index = req.params.index
    if (index < users.length && index >= 0) {
        if (req.body.Name && req.body.Age && req.body.email) {
            users[index] = req.body
            res.json({
                message : "Updated successfull"
            })
        }
        else {
            res.json({
                message : "Invalid fomrat (Name, Age, email required)"
            })
        }
    }
    else {
        res.json({
            message: "Invalid index"
        })
    }
})

// delete user by index
app.delete("/user/:index", (req, res) => {
    const index = req.params.index;
    if (index < users.length && index >= 0) {
        delete users[index]
        res.json({ 
            message: "deleted successfull"
        })
    }
    else {
        res.json({
            message: "Invalid index"
        })
    }
})

// export the app moduleto be used in server.js
module.exports = app