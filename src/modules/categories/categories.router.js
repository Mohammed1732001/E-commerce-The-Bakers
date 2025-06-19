import { Router } from "express";
import * as categoryController from "./controller/categories.js"
import { auth, authAdmin } from "../../middleware/authorization.js";
import validation from "../../middleware/validation.js";
import { fileUpload, fileValidation } from "../../utils/cloudnairyMulter.js";
import * as validationSchema from "./categories.validation.js"
const router = Router();


router.get("/", categoryController.categoryHome)
router.post("/create-category" , auth, authAdmin, fileUpload(fileValidation.image).single("image"), validation(validationSchema.createCategorySchema), categoryController.createCategory)
router.get("/all-categories", auth, categoryController.allCategories)
router.get("/single-category/:id",validation(validationSchema.singleCategorySchema) , auth, categoryController.singleCategory)
router.patch("/update-category/:id", validation(validationSchema.updateCategorySchema), auth, authAdmin, categoryController.updateCategory)
router.delete("/delete-category/:id", validation(validationSchema.deleteCategorySchema) ,auth, authAdmin, categoryController.deleteCategory)







export default router