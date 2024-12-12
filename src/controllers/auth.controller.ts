import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import knex from '../db/db';
import { User } from '../types/user.types';

 class AuthController {
  async  signup  (req: Request, res: Response, next: Function) {
 const { name, email, password } = req.body;

  if (!password || password.length < 6) {
    return next({ message: 'Password must be at least 6 characters long', statusCode: 400 });
  }

  try {
    const hashedPassword = await argon2.hash(password);

    const [insertedUserId] = await knex('users')
      .insert({ name, email, password: hashedPassword })
      .returning('id'); 

    const [user] = await knex('users')
      .where('id', insertedUserId) 
      .first(); 

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error); 
  }
};

async login (req: Request, res: Response, next: Function) {
  const { email, password } = req.body;

  try {
    const [user] = await knex<User>('users').where({ email });

    if (!user || !(await argon2.verify(user.password, password))) {
      return next({ message: 'Invalid credentials', statusCode: 401 });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error); 
  }
};

}
 const  authController = new AuthController()
 export default authController;