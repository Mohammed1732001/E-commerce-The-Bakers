import cartModel from "../../../DB/models/cart.schema.js";
import orderModel from "../../../DB/models/order.schema.js";
import { asyncHandler } from "../../../utils/errorHandling.js"



export const orderHome = asyncHandler(async (req, res, next) => {
    res.json({ message: "Order Home" })
})

export const createOrderFromCart = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const cart = await cartModel.findOne({ user: userId, isClosed: false });
    if (!cart || cart.items.length === 0) {
        return next(new Error("Your cart is empty or not found"));
    }
    const order = await orderModel.create({
        user: userId,
        items: cart.items,
        totalPrice: cart.totalPrice
    });
    cart.isClosed = true;
    await cart.save();
    res.status(201).json({ message: "Order created from cart", order });
});


export const myOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const orders = await orderModel.find({ user: userId }).sort({ createdAt: -1 });
  res.status(200).json({ message: "My Orders", orders });
});


export const allOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel
    .find()
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });

  res.status(200).json({ message: "All Orders", orders });
});

export const singleOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const order = await orderModel.findById(id).populate("items.product");
  if (!order) return next(new Error("Order not found"));

  if (order.user.toString() !== userId && req.user.role !== "admin") {
    return next(new Error("Not authorized"));
  }

  res.status(200).json({ message: "Order details", order });
});

