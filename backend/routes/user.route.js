import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log("Error in fetching users: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})

// za registraciju
router.post("/", async (req, res) => {
    const user = req.body;

    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Provjera jedinstvenosti emaila
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already exists!" });
    }

    // Provjera jedinstvenosti korisničkog imena
    const existingUsernameUser = await User.findOne({ username: user.username });
    if (existingUsernameUser) {
        return res.status(400).json({ success: false, message: "Username already exists!" });
    }

    // hashiranje lozinke
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error in Create User:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


// za prijavu
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    try {
        // Provjera postojanja korisnika
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Provjera lozinke
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Uspješna prijava
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in Login User:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid user id!" })
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted" })
    } catch (error) {
        console.log("error in deleting user: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
})



// nove rute

// // Ruta za dohvatanje korisničkog profila
// router.get('/profile', async (req, res) => {
//     const userCookie = req.cookies.user;
//     console.log(userCookie)

//     if (!userCookie) {
//         return res.status(401).json({ success: false, message: 'Korisnik nije prijavljen' });
//     }

//     const userData = JSON.parse(userCookie);

//     try {
//         const user = await User.findOne({ username: userData.username }).populate('reviews');
//         console.log("review",user.reviews)

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'Korisnik nije pronađen' });
//         }

//         return res.status(200).json({ success: true, user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server greška' });
//     }
// });

// Ruta za dohvatanje korisničkog profila
router.get('/profile', async (req, res) => {
    const userCookie = req.cookies.user;
    console.log('User cookie:', userCookie); // Provjera vrijednosti kolačića

    if (!userCookie) {
        return res.status(401).json({ success: false, message: 'Korisnik nije prijavljen' });
    }

    const userData = JSON.parse(userCookie);

    try {
        // Dohvati korisnika i njegove recenzije, te popuni `location_id` s `name` poljem
        const user = await User.findOne({ username: userData.username })
            .populate({
                path: 'reviews',
                populate: { path: 'location_id', select: 'name' } // Povezuje `location_id` i dohvaća `name`
            });

        console.log('User data:', user); // Ispisuje korisničke podatke za provjeru
        console.log('User reviews:', user.reviews); // Ispisuje recenzije za provjeru

        if (!user) {
            return res.status(404).json({ success: false, message: 'Korisnik nije pronađen' });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Greška pri dohvaćanju profila:', error); // Ispisuje grešku ako se desi
        res.status(500).json({ success: false, message: 'Server greška' });
    }
});



// Ruta za ažuriranje korisničkih podataka
router.put('/update', async (req, res) => {
    const userCookie = req.cookies.user;

    if (!userCookie) {
        return res.status(401).json({ success: false, message: 'Korisnik nije prijavljen' });
    }

    const userData = JSON.parse(userCookie);
    const { username, email, password } = req.body; // Ovdje možeš dodati i novu lozinku ako je potrebna

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: userData.username },
            { username, email, password: password ? await bcrypt.hash(password, 10) : userData.password }, // Ako je nova lozinka unesena, hashiraj je
            { new: true }
        );

        // Ažuriraj kolačić s novim podacima
        res.cookie('user', JSON.stringify({
            username: updatedUser.username,
            email: updatedUser.email,
        }), { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server greška' });
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('user');
    return res.status(200).json({ success: true, message: 'Korisnik je uspješno odjavljen.' });
});


export default router;
