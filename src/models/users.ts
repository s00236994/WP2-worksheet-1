import { Schema, model } from 'mongoose';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Martin
 *         email:
 *           type: string
 *           example: martin@example.com
 *         password:
 *           type: string
 *           example: difficult password
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: martin@example.com
 *         password:
 *           type: string
 *           example: difficult password
 */


export const registerZSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.email().toLowerCase(),
    password: z.string().min(6).max(64),
  }),
});

export const loginZSchema = z.object({
  body: z.object({
    email: z.email().toLowerCase(),
    password: z.string().min(1).max(64),
  }),
});


const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
}

export const UserModel = model<IUser>('User', userSchema);
