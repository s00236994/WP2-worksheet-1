import { Router } from 'express';
import { AuthController } from '../controllers/auth';

import { validate } from '../middleware/validate.middleware';

import { registerZSchema } from '../models/users';
 
const router = Router();
const authController = new AuthController();


router.post('/register', validate(registerZSchema), authController.register);

export default router;
