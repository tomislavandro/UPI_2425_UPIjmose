import express from "express";
import mongoose from "mongoose";
import Category from "../models/category.model.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, data: categories })
    } catch (error) {
        console.log("Error in fetching categories: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.post("/", async (req, res) => {
    const category = req.body;

    if (!category.name || !category.description) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    if (!category.locations || category.locations.length === 0) {
        category.locations = [];
    }

    const newCategory = new Category(category);

    try {
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory })
    } catch (error) {
        console.error("Error in Create Category:")
        res.status(500).json({ success: false, message: "Server Error" })
    }
})


router.put("/:id", async (req, res) => {
    const { id } = req.params

    const category = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid category id!" })
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true })
        res.status(200).json({ success: true, data: updatedCategory })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid category id!" })
    }

    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Category deleted" })
    } catch (error) {
        console.log("error in deleting category: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

// nova ruta
// Ruta za dohvaćanje kategorija sa znamenitostima i prosječnim ocjenama
router.get("/with-averages", async (req, res) => {
    try {
        const categories = await Category.find().populate({
            path: 'locations',
            populate: {
                path: 'reviews',
                select: 'rating' // Uzimamo samo ocjenu
            }
        });

        const categoriesWithAverages = categories.map(category => {
            return {
                _id: category._id,
                name: category.name,
                locations: category.locations.map(location => {
                    const ratings = location.reviews.map(review => review.rating);
                    const averageRating = ratings.length
                        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
                        : 'Nema ocjena';

                    return {
                        _id: location._id,
                        name: location.name,
                        averageRating
                    };
                })
            };
        });

        return res.status(200).json({ success: true, data: categoriesWithAverages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Greška pri dohvatu kategorija' });
    }
});


// // Nova ruta za dohvaćanje lokacija po kategoriji
// router.get("/:id/locations", async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ success: false, message: "Invalid category id!" });
//     }

//     try {
//         const locations = await Location.find({ category_id: id }).populate('reviews');
        
//         const uniqueLocations = [...new Map(locations.map(location => [location._id, location])).values()]; // Uklanjanje duplikata

//         const locationsWithAverageRating = uniqueLocations.map(location => {
//             const ratings = location.reviews.map(review => review.rating);
//             const averageRating = ratings.length
//                 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
//                 : 'Nema ocjena';

//             return {
//                 _id: location._id,
//                 name: location.name,
//                 average_rating: averageRating // Prosječna ocjena
//             };
//         });

//         return res.status(200).json({ success: true, data: locationsWithAverageRating });
//     } catch (error) {
//         console.error("Error fetching locations:", error);
//         return res.status(500).json({ success: false, message: "Server Error" });
//     }
// });




export default router;
