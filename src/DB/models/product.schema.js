import { Schema, Types, model } from "mongoose";




const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true })
    
const productModel = model("Product", productSchema);
export default productModel