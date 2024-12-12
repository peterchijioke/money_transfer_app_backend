import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  message: string;
  details?: string | unknown;
}

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500; 

  const errorResponse: ErrorResponse = {
    message: 'Something went wrong. Please try again later.',
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = err.message || err.stack || 'No details available';
  }

  if (err.code === 'ER_BAD_DB_ERROR') {
    errorResponse.message = 'Database not found. Please check your database configuration.';
  } else if (err.code === 'ECONNREFUSED') {
    errorResponse.message = 'Database connection refused. Please check the database connection.';
  }

  console.error(err,"SERVER ERROR");

  res.status(statusCode).json(errorResponse);
};
