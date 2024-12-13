import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../types/user.types';
import { userDAO } from '../dao/user.dao';



class AuthService {
 async authenticateUser(email: string, password: string): Promise<string> {
    const user = await userDAO.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: '1h' } 
    );
    return token;
  }

async registerUser(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  phone: string
): Promise<User> {
  try {
    const existingUser = await userDAO.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists. Please use a different email.');
    }

    const existingPhoneUser = await userDAO.findUserByPhone(phone);
    if (existingPhoneUser) {
      throw new Error('Phone number already in use. Please use a different phone number.');
    }

    const hashedPassword = await argon2.hash(password);

    const insertedUserId = await userDAO.insertUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
    });

    const user = await userDAO.findUserById(insertedUserId);
    if (!user) {
      throw new Error('Failed to retrieve the created user.');
    }

    return user;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
}

}

export const authService = new AuthService();
