import express from "express";
import mongoose from "mongoose";
import Location from "../models/location.model.js";
import Category from "../models/category.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const locations = await Location.find({});
        res.status(200).json({ success: true, data: locations })
    } catch (error) {
        console.log("Error in fetching locations: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.post("/", async (req, res) => {
    const location = req.body;

    if (!location.name || !location.category_id || !location.coordinates) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newLocation = new Location(location);

    try {
        // provjeri postoji li kategorija
        const category = await Category.findById(location.category_id);

        if (!category) {
            return res.status(400).json({ success: false, message: "Location does not exist!" })
        }

        await newLocation.save();
        res.status(201).json({ success: true, data: newLocation })
    } catch (error) {
        console.error("Error in Create Product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params

    const location = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid location id!" })
    }

    try {
        const updatedLocation = await Location.findByIdAndUpdate(id, location, { new: true })
        res.status(200).json({ success: true, data: updatedLocation })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid location id!" })
    }

    try {
        await Location.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" })
    } catch (error) {
        console.log("error in deleting product: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})


// novo
router.get("/by-category/:categoryId", async (req, res) => {
    const { categoryId } = req.params;

    try {
        const locations = await Location.find({ category_id: categoryId }).populate('reviews');
        res.status(200).json({ success: true, locations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Greška pri dohvatu lokacija" });
    }
});



export default router;
