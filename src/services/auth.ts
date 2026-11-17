import argon2 from 'argon2';
import { UserModel } from '../models/users';
import { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UnauthorizedError, UserAlreadyExistsError } from '../utils/apperrors';


// What we put inside the token. Remember: anyone can read the payload,
// so never put anything secret (like the password hash) in here.
export interface TokenPayload {
    sub: string;     // the user's _id
    email: string;
}

export interface PublicUser {
    _id: string;
    name: string;
    email: string;
}


// OWASP minimum settings for Argon2id: 19 MiB memory, 2 iterations, 1 thread
const hashOptions = {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
} as const;

export class AuthService {

    async register(name: string, email: string, password: string): Promise<PublicUser> {

        const passwordHash = await argon2.hash(password, hashOptions);


        try {
            const user = await UserModel.create({ name, email, passwordHash });
            // Build the response by hand so the hash never leaves the server
            return { _id: user._id.toString(), name: user.name, email: user.email };
        } catch (error) {
            //11000 = duplicate key, i.e. the unique index on email
            if (error instanceof mongo.MongoServerError && error.code === 11000) {
                throw new UserAlreadyExistsError();
            }
            throw error;
        }
    }

    createToken(payload: TokenPayload): string {
        return jwt.sign(payload, env.jwtSecret, {
            algorithm: 'HS256',
            expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
        });
    }

    verifyToken(token: string): TokenPayload {
        // Pin the algorithm so a token can't choose its own (e.g. "none")
        return jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] }) as TokenPayload;
    }

    async login(email: string, password: string): Promise<string> {

        const user = await UserModel.findOne({ email })

        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }

        const valid = await argon2.verify(user.passwordHash, password);
        if (!valid) throw new UnauthorizedError("Invalid email or password");

        // If we've raised the hash settings since this user registered,
        // re-hash now while we have their plain-text password.

        if (argon2.needsRehash(user.passwordHash, hashOptions)) {
            user.passwordHash = await argon2.hash(password, hashOptions);
            await user.save();
        }

        return this.createToken({ sub: user._id.toString(), email: user.email });
    }
}
