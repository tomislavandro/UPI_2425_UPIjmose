import request from "supertest";
import mongoose from "mongoose";
import app from "../backend/server.js";
import Location from "../backend/models/location.model.js";
import Category from "../backend/models/category.model.js";

describe("lokacijske rute", () => {
    let category;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        // Kreiranje kategorije za testiranje
        category = new Category({
            name: "Test Category2",
            description: "Test Description2",
            image: "http://example.com/image.jpg"
        });
        await category.save();
    });

    beforeEach(async () => {
        await Location.deleteOne({ name: "Get Location" });
        await Location.deleteOne({ name: "Update Location" });
        await Location.deleteOne({ name: "Updated Location" });
        await Location.deleteOne({ name: "New Location" });
    })

    afterEach(async () => {
        await Location.deleteOne({ name: "Get Location" });
        await Location.deleteOne({ name: "Update Location" });
        await Location.deleteOne({ name: "Updated Location" });
        await Location.deleteOne({ name: "New Location" });
    })

    afterAll(async () => {
        await Category.deleteOne({ name: "Test Category2" });
        await mongoose.connection.close();
    });

    it("treba dodati novu lokaciju", async () => {
        const newLocation = {
            name: "New Location",
            category_id: category._id,
            description: "New Description",
            address: "New Address",
            coordinates: { lat: 45.8150, lng: 15.9819 }
        };

        const res = await request(app)
            .post("/locations")
            .send(newLocation);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('name', 'New Location');
        expect(res.body.data).toHaveProperty('description', 'New Description');
        expect(res.body.data).toHaveProperty('address', 'New Address');
        expect(res.body.data.coordinates).toHaveProperty('lat', 45.8150);
        expect(res.body.data.coordinates).toHaveProperty('lng', 15.9819);
    });

    it("treba dohvatiti sve lokacije", async () => {
        const res = await request(app).get("/locations");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("treba azurirati postojecu lokaciju", async () => {
        // Kreiranje lokacije
        const location = new Location({
            name: "Update Location",
            category_id: category._id,
            description: "Update Description",
            address: "Update Address",
            coordinates: { lat: 45.8150, lng: 15.9819 }
        });
        await location.save();

        const updatedLocation = {
            name: "Updated Location",
            description: "Updated Description",
            address: "Updated Address",
            coordinates: { lat: 46.0000, lng: 16.0000 }
        };

        const res = await request(app)
            .put(`/locations/${location._id}`)
            .send(updatedLocation);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('name', 'Updated Location');
        expect(res.body.data).toHaveProperty('description', 'Updated Description');
        expect(res.body.data).toHaveProperty('address', 'Updated Address');
        expect(res.body.data.coordinates).toHaveProperty('lat', 46.0000);
        expect(res.body.data.coordinates).toHaveProperty('lng', 16.0000);
    });

    it("treba dohvatiti lokaciju po ID-u", async () => {
        // Kreiranje lokacije
        const location = new Location({
            name: "Get Location",
            category_id: category._id,
            description: "Get Description",
            address: "Get Address",
            coordinates: { lat: 45.8150, lng: 15.9819 }
        });
        await location.save();

        const res = await request(app).get(`/locations/by-category/${category._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('locations');
        expect(Array.isArray(res.body.locations)).toBe(true);
        expect(res.body.locations.length).toBeGreaterThan(0);

        const fetchedLocation = res.body.locations.find(loc => loc.name === 'Get Location');
        expect(fetchedLocation).toBeDefined();
        expect(fetchedLocation).toHaveProperty('name', 'Get Location');
        expect(fetchedLocation).toHaveProperty('description', 'Get Description');
        expect(fetchedLocation).toHaveProperty('address', 'Get Address');
        expect(fetchedLocation.coordinates).toHaveProperty('lat', 45.8150);
        expect(fetchedLocation.coordinates).toHaveProperty('lng', 15.9819);


    });
});
