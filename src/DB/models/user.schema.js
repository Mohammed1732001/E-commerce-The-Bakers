import { Schema, model } from "mongoose";
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })


const userModel = model("User", userSchema)

export default userModel