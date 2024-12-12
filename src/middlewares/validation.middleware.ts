import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (dtoClass: { new (): any }) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (typeof req.body !== 'object' || req.body === null) {
      res.status(400).json({ error: 'Invalid request body format' });
      return; 
    }

    const dtoInstance = plainToInstance(dtoClass, req.body);

    try {
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        const validationErrors = errors.map(err => ({
          property: err.property,
          constraints: err.constraints,
        }));

        res.status(400).json({
          error: 'Validation failed',
          details: validationErrors,
        });
        return; 
      }

      next();
    } catch (error) {
      console.error('Validation error:', error);
      res.status(500).json({ error: 'Unexpected error during validation' });
      return; 
    }
  };
};
