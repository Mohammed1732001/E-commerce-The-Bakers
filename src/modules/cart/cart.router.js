import { Router } from "express";
import * as cartController from "./controller/cart.js"
import { auth, authAdmin } from "../../middleware/authorization.js";
import validation from "../../middleware/validation.js";
import * as validationSchema from "./cart.validation.js"
const router = Router();


router.get("/", cartController.cartHome)
router.post("/create-and-add-to-cart", validation(validationSchema.createAndAddToCartSchema), auth, cartController.createAndAddToCart)
router.patch("/update-quantaty-item-cart/:id", validation(validationSchema.updateQuantityItemCartSchema), auth, cartController.updateQuantatyItemCart)
router.patch("/remove-item-from-cart/:id", validation(validationSchema.removeItemFromCartSchema), auth, cartController.removeItemFromCart);
router.get("/my-cart", auth, cartController.getMyCart);
router.get("/all-carts", auth, authAdmin, cartController.getAllCarts);









export default router