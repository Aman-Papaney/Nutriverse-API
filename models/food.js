import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    carbohydrates: {
        type: String,
        min : 1,
        max: 99,
        required: true
    },
    protein: {
        type: String,
        min: 1,
        max: 99,
        required: true
    },
    fats: {
        type: String,
        min: 1,
        max: 99,
        required: true
    },
    calories: {
        type: String,
        min: 1,
        max: 99,
        required: true
    },
    fiber: {
        type: String,
        min: 1,
        max: 99,
        required: true
    },
}, { timestamps: true })

const foodModel = mongoose.model("foods", foodSchema)

export default foodModel