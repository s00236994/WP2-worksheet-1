import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/apperrors';

export const validate = (schema: z.ZodObject<any>) => (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {

  const validation = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

  if (!validation.success) {

    next(new ValidationError('Validation failed',
      validation.error.issues));
    return;
  }

  req.body = validation.data.body;

  next();
};