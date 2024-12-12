import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

// Define the expected structure of the decoded JWT payload
interface DecodedToken extends JwtPayload {
  id: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction):any => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    req.user = decoded;  
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', details: error });
  }
};
