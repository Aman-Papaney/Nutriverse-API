import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min : 18,
        required: true
    },
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

export default userModel