import { Request, Response } from 'express';

export const handleWebhook = async (req: Request, res: Response) => {
  const { event, data } = req.body;
  try {
    if (event === 'deposit.completed') {
      console.log('Deposit completed:', data);
    }
    res.status(200).json({ message: 'Webhook received' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing webhook', details: error });
  }
};