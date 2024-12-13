import { Request, Response } from 'express';

export class WebhookService {
  /**
   * Handle webhook events.
   * @param req - The request object containing the event data.
   * @param res - The response object to send a response back to the client.
   */
  public async handleWebhook(req: Request, res: Response): Promise<void> {
    const { event, data } = req.body;

    try {
      if (event === 'deposit.completed') {
        console.log('Deposit completed:', data);
      }

      res.status(200).json({ message: 'Webhook received' });
    } catch (error) {
      res.status(500).json({ error: 'Error processing webhook', details: error });
    }
  }
}
