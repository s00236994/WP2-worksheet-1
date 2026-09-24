import { Schema, model } from 'mongoose';

export interface ICar {
  make: string;
  model: string;
}

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

export const CarModel = model<ICar>('Car', carSchema);
