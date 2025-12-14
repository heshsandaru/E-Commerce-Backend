import mongoose from "mongoose";

const category = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, "Category slug is required"],
    }    
})

const CategoryModel = mongoose.model("Category", category);

export { CategoryModel };