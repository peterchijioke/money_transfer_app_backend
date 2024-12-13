import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../types/user.types';
import { userDAO } from '../dao/user.dao';

class AuthService {
  async registerUser(name: string, email: string, password: string): Promise<User> {
    const existingUser = await userDAO.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists. Please use a different email.');
    }

    const hashedPassword = await argon2.hash(password);
    const insertedUserId = await userDAO.insertUser({ name, email, password: hashedPassword });

    const user = await userDAO.findUserById(insertedUserId);
    if (!user) {
      throw new Error('Failed to retrieve the created user.');
    }

    return user;
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const user = await userDAO.findUserByEmail(email);
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token;
  }
}

export const authService = new AuthService();
