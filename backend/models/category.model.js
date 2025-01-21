import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    image: { type: String }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
