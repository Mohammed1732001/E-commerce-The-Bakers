import categoryModel from "../../../DB/models/category.schema.js";
import productModel from "../../../DB/models/product.schema.js";
import cloudinary from "../../../utils/cloudnairy.js";
import { asyncHandler } from "../../../utils/errorHandling.js"
import fs from "fs";





export const productHome = (req, res, next) => {
    res.json({ message: "Product Home" })
}

export const createProduct = asyncHandler(async (req, res, next) => {
    const { name, description, price, category } = req.body

    if (!req.file) {
        return next(new Error("File upload required"));
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "product/image",
    });

    fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete local image:", err);
    });
    const product = await productModel.create({ name, description, price, category, image: result.secure_url })

    const categoryUpdate = await categoryModel.findByIdAndUpdate(category, { $push: { products: product._id } }, { new: true })
    res.status(200).json({ message: "Add product", product })



})

export const allProducts = asyncHandler(async (req, res, next) => {
    const products = await productModel.find().populate("category")
    res.json({ message: "All Products", products })
})

export const singleProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return next(new Error("id is required"))
    }
    const product = await productModel.findById(id).populate("category")
    res.json({ message: "Single Product", product })
})

export const updateProduct = asyncHandler(async (req, res, next) => {
    const { name, description, price } = req.body
    const { id } = req.params;
    if (!id) {
        return next(new Error("id is required"));
    }
    const product = await productModel.findById(id);
    if (!product) {
        return next(new Error("Product not found"));
    }
    product.name = name;
    product.description = description;
    product.price = price;
    await product.save();
    res.json({ message: "Product updated successfully", product });
})


export const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new Error("id is required"));
    }
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
        return next(new Error("Product not found"));
    }
    const getCategory = await categoryModel.findById(product.category)
    if (getCategory) {
        const categoryUpdate = await categoryModel
            .findByIdAndUpdate(product.category, { $pull: { products: product._id } }, { new: true })

    }
    res.json({ message: "Product deleted successfully" });
})