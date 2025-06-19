import { Router } from "express";
import * as authController from "./controller/auth.js"
import validation from "../../middleware/validation.js";
import * as validationSchema from "./auth.validation.js"
const router = Router();


router.get("/", authController.authHome)
router.post("/signUp", validation(validationSchema.signUpSchema), authController.createUser)
router.post("/login", validation(validationSchema.loginSchema), authController.loginUser)




export default router