import request from "supertest";
import { app } from "../../src/app";

const validCar = {
    make: "Ford",
    model: "Focus",
    year: 2015
};

// a correctly formatted MongoDB id that doesn't exist in the database
const missingId = "000000000000000000000000";

// filled in by the POST test, then used by the tests after it
let carId: string;

describe('GET /cars', () => {

    it('returns all cars', async () => {
        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);
    });

});

describe('POST /cars', () => {

    it('creates a car with valid data and an api key', async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .set('x-api-key', 'blahblah')
            .send(validCar);

        expect(response.status).toBe(201);
        expect(response.body.make).toBe("Ford");
        expect(response.body.model).toBe("Focus");
        expect(response.body.year).toBe(2015);

        carId = response.body._id;
    });

    it('returns 401 when there is no api key', async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .send(validCar);

        expect(response.status).toBe(401);
    });

    it('returns 400 for invalid data', async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .set('x-api-key', 'blahblah')
            .send({ ...validCar, make: "" });

        expect(response.status).toBe(400);
    });

});

describe('GET /cars/:id', () => {

    it('returns the car that was created', async () => {
        const response = await request(app)
            .get(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(200);
        expect(response.body.make).toBe("Ford");
        expect(response.body.model).toBe("Focus");
    });

    it('returns 404 for a car that does not exist', async () => {
        const response = await request(app)
            .get(`/api/v1/cars/${missingId}`);

        expect(response.status).toBe(404);
    });

});

describe('PUT /cars/:id', () => {

    it('updates the car', async () => {
        const response = await request(app)
            .put(`/api/v1/cars/${carId}`)
            .send({ make: "Ford", model: "Fiesta", year: 2020 });

        expect(response.status).toBe(200);
        expect(response.body.model).toBe("Fiesta");
        expect(response.body.year).toBe(2020);
    });

    it('returns 400 for invalid data', async () => {
        const response = await request(app)
            .put(`/api/v1/cars/${carId}`)
            .send({ make: "Ford", model: "Fiesta", year: 1900 });

        expect(response.status).toBe(400);
    });

    it('returns 404 for a car that does not exist', async () => {
        const response = await request(app)
            .put(`/api/v1/cars/${missingId}`)
            .send(validCar);

        expect(response.status).toBe(404);
    });

});

describe('DELETE /cars/:id', () => {

    it('deletes the car', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(200);
    });

    it('cannot find the car after it is deleted', async () => {
        const response = await request(app)
            .get(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(404);
    });

    it('returns 404 when deleting a car that is already gone', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(404);
    });

});