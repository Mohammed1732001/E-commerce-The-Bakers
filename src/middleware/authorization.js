import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/errorHandling.js"
import userModel from "../DB/models/user.schema.js"




export const auth = asyncHandler(async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return next(new Error("Token is required"))
    }
    const decoded = jwt.verify(token, process.env.SIGN_TOKEN)
    if (!decoded?.id || !decoded?.role) {
        return next(new Error("in valid token payRool"))
    }
    const authUser = await userModel.findById(decoded.id).select("_id email role")
    if (!authUser) {
        return next(new Error("Not Rigister Account"))
    }
    req.user = authUser
    return next()
})


export const authAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new Error("Not Admin Account"))
    }
    return next()
    
})