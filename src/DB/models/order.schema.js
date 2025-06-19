import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "fawry", "vodafoneCash"],
    default: "cash"
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  }
}, { timestamps: true });

const orderModel = model("Order", orderSchema);
export default orderModel;
