import { Router } from "express";
import * as productController from "./controller/product.js"
import { fileUpload, fileValidation } from "../../utils/cloudnairyMulter.js";
import { auth, authAdmin } from "../../middleware/authorization.js";
import validation from "../../middleware/validation.js";
import * as validationSchema from "./product.validation.js"
const router = Router();



router.get("/", productController.productHome)
router.post("/create-product", auth, authAdmin, fileUpload(fileValidation.image).single("image"),
    validation(validationSchema.createProductSchema), productController.createProduct)
router.get("/all-products", auth, productController.allProducts)
router.get("/single-product/:id", validation(validationSchema.productIdSchema), auth, productController.singleProduct)
router.patch("/update-product/:id", validation(validationSchema.updateProductSchema), auth, authAdmin, productController.updateProduct)
router.delete("/delete-product/:id", validation(validationSchema.productIdSchema), auth, authAdmin, productController.deleteProduct)






export default router