import { Router } from "express";
import * as userController from "./controller/user.js"
import { auth, authAdmin } from "../../middleware/authorization.js";
import validation from "../../middleware/validation.js";
import * as validationSchema from "./user.validation.js"
const router = Router();



router.get("/", userController.userHome)
router.get("/all-users", auth, authAdmin, userController.allUsers)
router.get("/single-user/:id",validation(validationSchema.singleUserSchema) ,auth,authAdmin, userController.singleUser)
router.get("/my-profile", auth, userController.myProfile) 
router.patch("/update-user/:id",validation(validationSchema.updateUserSchema) ,auth, authAdmin , userController.updateUser)
router.patch("/update-active/:id",validation(validationSchema.updateActiveSchema) ,auth, authAdmin , userController.updateActive)
router.patch("/update-myProfile", validation(validationSchema.updateMyProfileSchema), auth, userController.updateMyProfile)
router.patch("/reset-password", auth, userController.resetPassword)
router.patch("/update-password", validation(validationSchema.updatePasswordSchema), auth, userController.updatePassword)
router.delete("/delete-user/:id" , validation(validationSchema.deleteUserSchema), auth , authAdmin, userController.deleteUser)



export default router