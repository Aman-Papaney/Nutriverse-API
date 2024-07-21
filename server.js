
import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import 'dotenv/config'
import { rateLimit } from 'express-rate-limit'

import userModel from "./models/user.js"
import foodModel from "./models/food.js"
import tackingModel from "./models/tracking.js"
import verifyToken from "./misc/verifyToken.js"
import trackingModel from "./models/tracking.js"

mongoose.connect("mongodb://127.0.0.1:27017/nutriverse")
    .then(() => {
        console.log("Database Connection Successfull")
    })
    .catch((err) => {
        console.log(err)
    })

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    limit: 100,
    message : {message : "Request Limit Reached"}
})

const app = express()
app.use(limiter)
app.use(express.json())

app.post("/register", (req, res) => {

    let user = req.body

    bcrypt.genSalt(5, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (!err) {
                    try {
                        user.password = hash
                        let data = await userModel.create(user)
                        res.status(201).send({ message: "User Registered Successfully",
                            user : data 
                         })
                    }
                    catch (err) {
                        res.status(500).send({ message: "Error Occurred" })
                        console.log(err)
                    }
                }
                else {

                    res.status(500).send({ message: "Error Occurred" })
                    console.log(err)
                }
            })
        }
        else {

            res.status(500).send({ message: "Error Occured" })
            console.log(err)
        }
    })
})

app.post("/login", async (req, res) => {

    let userData = req.body

    try {
        let data = await userModel.findOne({ email: userData.email })
        if (data !== null) {
            bcrypt.compare(userData.password, data.password, (err, result) => {
                if (result === true) {
                    jwt.sign({ email: userData.email }, process.env.JWT_KEY, (err, token) => {
                        if (!err) {
                            res.status(200).send({ message: "Login Success", token: token })
                        }
                    })
                }
                else {
                    res.status(401).send({ message: "Invalid E-mail or Password" })
                }
            })
        }
        else {
            res.status(401).send({ message: "Invalid E-mail or Password" })
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }
})

app.get("/foods", verifyToken, async (req, res) => {

    try {
        let foods = await foodModel.find()
        res.status(200).send(foods)
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
        console.log(err)
    }
})

app.get("/foods/:name", verifyToken, async (req, res) => {
    const foodName = req.params.name

    try {
        const food = await foodModel.find({ name: { $regex: foodName, $options: 'i' } })
        res.status(200).send(food)
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }

})

app.post("/track", verifyToken, async (req, res) => {

    const trackData = req.body

    try {
        let data = await tackingModel.create(trackData)
        res.status(201).send({ message: "Food Added to Track" })
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }

})

app.get("/track/:userId/:date", verifyToken, async (req, res) => {
    const uId = req.params.userId
    let date = new Date(req.params.date)
    date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()

    try {
        let data = await trackingModel.find({ user_id: uId, date: date })
            .populate("user_id").populate("food_id")
        res.status(200).send(data)
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }
})

app.listen(8000, () => {
    console.log("Server Running at http://localhost:8000")
})