import { Request, Response } from 'express';
import { initiateTransfer } from '../services/raven.service';
import knex from '../db/db';

export const sendMoney = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { recipientAccount, amount, bankCode } = req.body;
  try {
    const transferResponse = await initiateTransfer(recipientAccount, amount, bankCode);
    await knex('transactions').insert({
      user_id: userId,
      type: 'transfer',
      amount,
      status: transferResponse.status,
      reference: transferResponse.reference,
    });
    res.status(200).json({ message: 'Transfer successful', transferResponse });
  } catch (error) {
    res.status(500).json({ error: 'Error sending money', details: error });
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const transactions = await knex('transactions').where({ user_id: userId });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transactions', details: error });
  }
};
