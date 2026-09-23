import { CarModel, ICar } from '../models/cars'
import { HydratedDocument } from 'mongoose';

export class CarService {



  async getAllCars(): Promise<ICar[]> {
    return await CarModel.find().lean(); 
  }

  async getCarById(id: string): Promise<ICar | null> {
    return await CarModel.findById(id).lean();
  }

  async createCar(carData: ICar): Promise<HydratedDocument<ICar>> {
    const car = new CarModel(carData);
    return await car.save();
  }

  async updateCar(id: string, carData: Partial<ICar>): Promise<ICar | null> {
    return await CarModel.findByIdAndUpdate(id, carData, { returnDocument: 'after' }).lean();
  }

  async deleteCar(id: string): Promise<ICar | null> {
    return await CarModel.findByIdAndDelete(id).lean();
  }
}
