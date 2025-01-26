import request from "supertest";
import mongoose from "mongoose";
import app from "../backend/server.js";
import Category from "../backend/models/category.model.js";

describe("rute kategorije", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });


  beforeEach(async () => {
    // Brisanje kategorije
    await Category.deleteOne({ name: 'Test Category' });
    await Category.deleteOne({ name: 'New Category' });
  });

  afterEach(async () => {
    // Brisanje kategorije
    await Category.deleteOne({ name: 'Test Category' });
    await Category.deleteOne({ name: 'New Category' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("treba dohvatiti sve kategorije", async () => {
    // Kreiranje kategorije
    const category = new Category({
      name: "Test Category",
      description: "Test Description",
      image: "http://example.com/image.jpg"
    });
    await category.save();

    // Pokušajmo dohvatiti sve kategorije
    const res = await request(app).get("/categories");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');

    // Provjerite da li je kategorija ispravno dohvaćena
    const fetchedCategory = res.body.data.find(cat => cat.name === 'Test Category');
    expect(fetchedCategory).toBeDefined();
    expect(fetchedCategory).toHaveProperty('name', 'Test Category');
    expect(fetchedCategory).toHaveProperty('description', 'Test Description');
    expect(fetchedCategory).toHaveProperty('image', 'http://example.com/image.jpg');
  });

  it("treba stvoriti novu kategoriju", async () => {
    const newCategory = {
      name: "New Category",
      description: "New Description",
      image: "http://example.com/newimage.jpg"
    };

    const res = await request(app)
      .post("/categories")
      .send(newCategory);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('name', 'New Category');
    expect(res.body.data).toHaveProperty('description', 'New Description');
    expect(res.body.data).toHaveProperty('image', 'http://example.com/newimage.jpg');
  });
});
