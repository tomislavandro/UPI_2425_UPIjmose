import express from "express";
import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Location from "../models/location.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, data: reviews })
    } catch (error) {
        console.log("Error in fetching reviews: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.post("/", async (req, res) => {
    const review = req.body;

    // Provjera svih potrebnih polja
    if (!review.user_id || !review.location_id  || !review.rating) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Provjera je li ocjena unutar dopuštenog raspona
    if (review.rating < 1 || review.rating > 5) {
        return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const newReview = new Review(review);

    try {
        // Provjeri postoji li korisnik
        const user = await User.findById(review.user_id);
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist!" });
        }

        // Provjeri postoji li lokacija
        const location = await Location.findById(review.location_id);
        if (!location) {
            return res.status(400).json({ success: false, message: "Location does not exist!" });
        }

        await newReview.save();

        await User.findByIdAndUpdate(
            review.user_id,
            { $push: { reviews: newReview._id } }
        );

        await Location.findByIdAndUpdate(
            review.location_id,
            { $push: { reviews: newReview._id } }
        );

        // IZRAČUN PROSJEČNE OCJENE: Dohvati sve recenzije za lokaciju i izračunaj novu prosječnu ocjenu
        const locationReviews = await Review.find({ location_id: review.location_id });
        const averageRating = locationReviews.reduce((sum, r) => sum + r.rating, 0) / locationReviews.length;

        // Ažuriraj prosječnu ocjenu lokacije
        await Location.findByIdAndUpdate(
            review.location_id,
            { average_rating: averageRating }
        );


        res.status(201).json({ success: true, data: newReview });
    } catch (error) {
        console.error("Error in Create Review:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params

    const review = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid review id!" })
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(id, review, { new: true })

        // AŽURIRANJE PROSJEČNE OCJENE LOKACIJE: Ponovno preračunaj prosječnu ocjenu
        const locationReviews = await Review.find({ location_id: updatedReview.location_id });
        const averageRating = locationReviews.reduce((sum, r) => sum + r.rating, 0) / locationReviews.length;

        await Location.findByIdAndUpdate(
            updatedReview.location_id,
            { average_rating: averageRating }
        );

        res.status(200).json({ success: true, data: updatedReview })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
})


router.delete("/:id", async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid review id!" })
    }

    try {
        const reviewToDelete = await Review.findById(id);

        await Review.findByIdAndDelete(id);


        // Ažuriraj korisnika: ukloni ID recenzije iz korisnikovog `reviews` polja
        await User.findByIdAndUpdate(
            reviewToDelete.user_id,
            { $pull: { reviews: reviewToDelete._id } }
        );

        // Ažuriraj lokaciju: ukloni ID recenzije iz `reviews` polja lokacije
        await Location.findByIdAndUpdate(
            reviewToDelete.location_id,
            { $pull: { reviews: reviewToDelete._id } }
        );

        // Ponovno preračunaj prosječnu ocjenu za lokaciju
        const locationReviews = await Review.find({ location_id: reviewToDelete.location_id });
        const averageRating = locationReviews.length
            ? locationReviews.reduce((sum, r) => sum + r.rating, 0) / locationReviews.length
            : 0;

        await Location.findByIdAndUpdate(
            reviewToDelete.location_id,
            { average_rating: averageRating }
        );



        res.status(200).json({ success: true, message: "Review deleted" })
    } catch (error) {
        console.log("error in deleting product: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})


// nova ruta
router.get('/by-category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    try {
        // Prvo pronađi sve lokacije koje pripadaju toj kategoriji
        const locations = await Location.find({ category_id: categoryId }).select('_id');

        if (!locations.length) {
            return res.status(404).json({ success: false, message: 'Nema lokacija za ovu kategoriju.' });
        }

        // Zatim, pronađi sve recenzije koje pripadaju tim lokacijama
        const reviews = await Review.find({ location_id: { $in: locations.map(loc => loc._id) } })
            .populate('user_id', 'username') // Ako želiš dobiti korisničko ime
            .populate('location_id'); // Ako želiš dobiti informacije o lokaciji

        return res.status(200).json({ success: true, reviews });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server greška' });
    }
});




export default router;
