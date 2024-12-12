import { Request, Response } from 'express';
import knex from '../db/db';
import { generateUniqueBankAccount } from '../services/raven.service';

export const generateBankAccount = async (req: Request, res: Response):Promise<any> => {
  if(!req.user)return

  const userId = req?.user?.id;
  try {
    const bankAccount = userId&&await generateUniqueBankAccount(userId);
    await knex('users').where({ id: userId }).update({ bank_account: bankAccount });
    res.status(201).json({ message: 'Bank account generated', bankAccount });
  } catch (error) {
    res.status(500).json({ error: 'Error generating bank account', details: error });
  }
};

export const getUserDetails = async (req: Request, res: Response):Promise<any> => {
  if(!req?.user)return
  const userId = req?.user?.id;
  try {
    const [user] = await knex('users').where({ id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user details', details: error });
  }
};