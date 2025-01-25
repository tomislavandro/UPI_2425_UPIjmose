import request from "supertest";
import mongoose from "mongoose";
import app from "../backend/server.js"
import User from "../backend/models/user.model.js";


describe("korisnicke rute", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    })

    beforeEach(async () => {
        // Brisanje korisnika prije svakog testa
        await User.deleteOne({ email: 'newuser@example.com' });
        await User.deleteOne({ email: 'unique@example.com' });
        await User.deleteOne({email: 'test@example.com'});
    });

    afterEach(async () => {
        // Brisanje korisnika nakon svakog testa
        await User.deleteOne({ email: 'newuser@example.com' });
        await User.deleteOne({ email: 'unique@example.com' });
        await User.deleteOne({email: 'test@example.com'});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    })


    it("stvaranje novog korisnika", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: 'newuser@example.com', username: 'newuser', password: 'password123' })

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('email', 'newuser@example.com');
        expect(res.body.data).toHaveProperty('username', 'newuser');
    })


    it("trebalo bi vratiti 400 ako nedostaju polja", async () => {
        const res = await request(app)
            .post("/users")
            .send({ email: 'test@example.com' }); // Nedostaje username i password

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'Please provide all fields');
    });

    it("trebalo bi vratiti 400 ako email već postoji", async () => {
        // Prvo dodajte korisnika
        await request(app)
            .post("/users")
            .send({ email: 'test@example.com', username: 'testuser', password: 'password123' });

        // Pokušajte dodati korisnika s istim emailom
        const res = await request(app)
            .post("/users")
            .send({ email: 'test@example.com', username: 'newuser', password: 'password123' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'Email already exists!');
    });

    it("trebalo bi vratiti 400 ako korisničko ime već postoji", async () => {
        // Prvo dodajte korisnika
        await request(app)
            .post("/users")
            .send({ email: 'unique@example.com', username: 'testuser', password: 'password123' });

        // Pokušajte dodati korisnika s istim korisničkim imenom
        const res = await request(app)
            .post("/users")
            .send({ email: 'new@example.com', username: 'testuser', password: 'password123' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body).toHaveProperty('message', 'Username already exists!');
    });


})
