import { Schema, model } from 'mongoose';

export interface ICar {
  make: string;
  model: string;
  year: number;
}

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, min: 1950 }
  },
  { timestamps: true }
);

export const CarModel = model<ICar>('Car', carSchema);
