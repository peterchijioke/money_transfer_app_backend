import { Request, Response, NextFunction } from 'express';
import { webhookService } from '../services/webhook.service';

class WebhookController {
  /**
   * Handle the transfer status webhook.
   * @param req - The request object containing the event data.
   * @param res - The response object to send a response back to the client.
   * @param next - The next function for error handling.
   */
  async handleTransferStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { merchant_ref, meta, trx_ref, secret, status, response } = req.body;
      await webhookService.processTransferStatus(trx_ref, status, meta, response, secret);
      res.status(200).json({ message: 'Transfer status processed successfully' });
    } catch (error) {
      next(error); 
    }
  }
}

export const webhookController = new WebhookController();
