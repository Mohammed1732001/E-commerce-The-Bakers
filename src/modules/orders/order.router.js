import { Router } from "express";
import * as orderController from "./controller/order.js"
import { auth, authAdmin } from "../../middleware/authorization.js";
import validation from "../../middleware/validation.js";
import { singleOrderSchema } from "./order.validation.js";

const router = Router();


router.get("/", orderController.orderHome)
router.post("/create-order", auth, orderController.createOrderFromCart);
router.get("/my-orders", auth, orderController.myOrders);
router.get("/all-orders", auth, authAdmin, orderController.allOrders);
router.get("/order/:id", validation(singleOrderSchema) ,auth, orderController.singleOrder);






export default router