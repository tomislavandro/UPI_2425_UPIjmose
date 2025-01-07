import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    address: { type: String },
    average_rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    }
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
