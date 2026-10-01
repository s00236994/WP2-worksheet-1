import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface ICar {
  make: string;
  model: string;
  year?: number;
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

export const createCarZSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1950).optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - make
 *         - model
 *       properties:
 *         make:
 *           type: string
 *           example: Renault
 *         model:
 *           type: string
 *           example: Megane
 *         year:
 *           type: integer
 *           example: 2010
 */

export const updateCarZSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1950).optional(),
});

