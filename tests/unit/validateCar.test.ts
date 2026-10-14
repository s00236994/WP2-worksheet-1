import { createCarZSchema } from "../../src/models/cars";

const validCar = {
    "make": "Una",
    "model": "0871234567",
    "year": 1980
}

describe('Test Car Validation', () => {

    it('should pass for the following valid data', () => {
        expect(() => createCarZSchema.parse(
            { body: validCar })).not.toThrow();
    });

    it('should pass for the following valid data - no date', () => {
        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "year": undefined } })).not.toThrow();
    });

    it('should fail for the too early year ', () => {
        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "year": 1949 } })).toThrow();
    });

    it('should fail for the unparsaable year ', () => {
        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "year": 'wrong year' } })).toThrow();
    });

    it('should fail for the missing make ', () => {
        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "make": undefined } })).toThrow();
    });

    it('should fail for the empty model ', () => {
        expect(() => createCarZSchema.parse(
            { body: { ...validCar, "model": '' } })).toThrow();
    });

});