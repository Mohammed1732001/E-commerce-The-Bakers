import userModel from "../../../DB/models/user.schema.js";
import { asyncHandler } from "../../../utils/errorHandling.js"
import { compare, hash } from "../../../utils/hashAndCompare.js";
import jwt from "jsonwebtoken"



export const authHome = (req, res, next) => {
    res.json({ message: "Auth Home" })
}

export const createUser = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, cPassword, phone } = req.body;
    if (password !== cPassword) {
        throw new Error("password not match");
    }
    const user = await userModel.findOne({ email});
    if (user) {
        throw new Error("user already exist");
    }
    const hashedPassword = hash({ plainText: password });
    const newUser = await userModel.create({ fullName, email, password: hashedPassword, phone});
    res.status(201).json({ message: "user created successfully", user: newUser })
})


export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new Error("user not found"));
    }
    const comparedPassword = compare({ plainText: password, hashValue: user.password });
    if (!comparedPassword) {
        return next(new Error("in valid-password "))
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SIGN_TOKEN)
    res.status(200).json({ message: "login success", token })
})