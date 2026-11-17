import { Request, Response } from 'express';
import { AuthService } from '../services/auth';



const authService = new AuthService();
export class AuthController {

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation failed
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

  register = async (req: Request, res: Response): Promise<void> => {

      const { name, email, password } = req.body;
      const user = await authService.register(name, email, password);

      res.status(201).json(user);
  };
}
