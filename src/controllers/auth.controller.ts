import { Request, Response } from 'express';
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken';
import knex from '../db/db';
import { User } from '../types/user.types';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);
    const [user] = await knex('users').insert({ name, email, password: hashedPassword }).returning('*');

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user', details: error });
  }
};


export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const [user] = await knex<User>('users').where({ email });

    if (!user || !(await argon2.verify(user.password, password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ error: 'Error logging in', details: error });
  }
};