import { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: true 
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
                default: 1,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    },
    isClosed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const cartModel = model("Cart", cartSchema);
export default cartModel;
