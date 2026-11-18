import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().int().positive(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
    JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
    JWT_EXPIRES_IN: z.string().default("1h"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("Environment validation failed");
    console.error(z.prettifyError(result.error));
    process.exit(1);
}

export const env = {
    port: result.data.PORT,
    nodeEnv: result.data.NODE_ENV,
    mongoURI: result.data.MONGODB_URI,
    jwtSecret: result.data.JWT_SECRET,
    jwtExpiresIn: result.data.JWT_EXPIRES_IN,
};
