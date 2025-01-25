import request from "supertest";
import mongoose from "mongoose";
import app from "../backend/server.js";
import Review from "../backend/models/review.model.js";
import Location from "../backend/models/location.model.js";
import User from "../backend/models/user.model.js";
import Category from "../backend/models/category.model.js";

describe("review routes", () => {
  let user, location, category, review;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Kreiranje korisnika za testiranje
    user = new User({
      username: "testuser2",
      email: "testuser2@example.com",
      password: "password123"
    });
    await user.save();

    // Kreiranje kategorije za testiranje
    category = new Category({
      name: "Test Category3",
      description: "Test Description",
      image: "http://example.com/image.jpg"
    });
    await category.save();

    // Kreiranje lokacije za testiranje
    location = new Location({
      name: "Test Location5",
      category_id: category._id,
      description: "Test Description",
      address: "Test Address",
      coordinates: { lat: 45.8150, lng: 15.9819 }
    });
    await location.save();
  });

  afterAll(async () => {
    await User.deleteOne({ username: "testuser2" });
    await Category.deleteOne({ name: "Test Category3" });
    await Location.deleteOne({ name: "Test Location5" });
    await mongoose.connection.close();
  });

  it("treba stvoriti novu recenziju", async () => {
    const newReview = {
      user_id: user._id,
      location_id: location._id,
      rating: 5,
      comment: "Great place!"
    };

    const res = await request(app)
      .post("/reviews")
      .send(newReview);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('rating', 5);
    expect(res.body.data).toHaveProperty('comment', 'Great place!');
    review = res.body.data; // Spremi recenziju za kasnije testove
  });

  it("treba dohvatiti sve recenzije", async () => {
    const res = await request(app).get("/reviews");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("treba ažurirati postojeću recenziju", async () => {
    const updatedReview = {
      rating: 4,
      comment: "Good place!"
    };

    const res = await request(app)
      .put(`/reviews/${review._id}`)
      .send(updatedReview);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('rating', 4);
    expect(res.body.data).toHaveProperty('comment', 'Good place!');
  });

  it("treba obrisati postojeću recenziju", async () => {
    const res = await request(app)
      .delete(`/reviews/${review._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Review deleted');
  });
});
