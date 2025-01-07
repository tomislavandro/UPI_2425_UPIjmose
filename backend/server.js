import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js"
import mongoose from "mongoose"; // mozda ce se trebati obrisati

import CategoryRoutes from "./routes/category.route.js"
import LocationRoutes from "./routes/location.route.js"
import ReviewRoutes from "./routes/review.route.js"
import UserRoutes from "./routes/user.route.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 1000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/categories", CategoryRoutes)
app.use("/locations", LocationRoutes)
app.use("/users", UserRoutes)
app.use("/reviews", ReviewRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server started at http://localhost:${PORT}`)
});
