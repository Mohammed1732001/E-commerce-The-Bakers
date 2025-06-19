import categoryModel from "../../../DB/models/category.schema.js"
import { asyncHandler } from "../../../utils/errorHandling.js"
import cloudinary from "../../../utils/cloudnairy.js";
import fs from "fs";




export const categoryHome = (req, res, next) => {
    res.json({ message: "Category Home" })
}

export const createCategory = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body

if (!req.file) {
        return next(new Error("File upload required"));
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "category/image",
    });

    fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete local image:", err);
    });

    const newCategory = await categoryModel.create({ name, description , image: result.secure_url })
    res.json({ message: "Category created successfully", newCategory })
})

export const allCategories = asyncHandler(async (req, res, next) => {
    const categories = await categoryModel.find().populate("products")
    res.json({ message: "All Categories", categories })
})

export const singleCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return next(new Error("id is required"))
    }
    const category = await categoryModel.findById(id).populate("products")
    if (!category) {
        return next(new Error("Category not found"))
    }
    res.json({ message: "Single Category", category })
})

export const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id) {
        return next(new Error("id is required"));
    }
    const category = await categoryModel.findById(id);
    if (!category) {
        return next(new Error("Category not found"));
    }
    category.name = name;
    category.description = description;
    await category.save();
    res.json({ message: "Category updated successfully", category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new Error("id is required"));
    }
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
        return next(new Error("Category not found"));
    }
    res.json({ message: "Category deleted successfully" });
});


