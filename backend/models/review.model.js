import mongoose from "mongoose"


const reviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: { type: String },
    image: { type: String }
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;
