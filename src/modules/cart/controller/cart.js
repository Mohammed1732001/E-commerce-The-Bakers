import cartModel from "../../../DB/models/cart.schema.js";
import productModel from "../../../DB/models/product.schema.js";
import { asyncHandler } from "../../../utils/errorHandling.js"




export const cartHome = asyncHandler(async (req, res, next) => {
    res.json({ message: "Cart Home" })
})

export const createAndAddToCart = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
        return next(new Error("Product not found"));
    }
    const productPrice = product.price;
    let cart = await cartModel.findOne({ user: userId, isClosed: false });
    if (!cart) {
        cart = await cartModel.create({
            user: userId,
            items: [
                {
                    product: productId,
                    quantity,
                    price: productPrice
                }
            ],
            totalPrice: quantity * productPrice
        });
    } else {
        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: productPrice
            });
        }

        cart.totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, 0);

        await cart.save();
    }

    res.status(200).json({ message: "Product added to cart successfully", cart });
})


export const updateQuantatyItemCart = asyncHandler(async (req, res, next) => {
  const { id } = req.params; 
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!productId || quantity === undefined) {
    return next(new Error("ProductId and quantity are required"));
  }

  if (quantity < 0) {
    return next(new Error("Quantity must be 0 or more"));
  }

  const cart = await cartModel.findOne({ _id: id, user: userId });
  if (!cart) {
    return next(new Error("Cart not found or you are not authorized"));
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(new Error("Product not found in cart"));
  }

  if (quantity === 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  cart.totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  await cart.save();

  res.json({ message: "Cart item updated", cart });
});

export const removeItemFromCart = asyncHandler(async (req, res, next) => {
  const { id } = req.params; 
  const { productId } = req.body;
  const userId = req.user.id;

  if (!productId) {
    return next(new Error("ProductId is required"));
  }

  const cart = await cartModel.findOne({ _id: id, user: userId });
  if (!cart) {
    return next(new Error("Cart not found or you are not authorized"));
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(new Error("Product not found in cart"));
  }

  cart.items.splice(itemIndex, 1);

  cart.totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  await cart.save();

  res.json({ message: "Item removed from cart", cart });
});


export const getMyCart = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    const cart = await cartModel.findOne({ user: id, isClosed: false }).populate("items.product").populate("user");

    if (!cart) {
        return res.json({ message: "Your cart is empty", cart: null });
    }

    res.json({ message: "My Cart", cart });
});

export const getAllCarts = asyncHandler(async (req, res, next) => {
  const carts = await cartModel.find().populate("user").populate("items.product");
  res.json({ message: "All Carts", carts });
});

