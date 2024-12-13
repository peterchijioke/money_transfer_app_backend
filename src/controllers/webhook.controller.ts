import { Request, Response } from 'express';
import { WebhookService } from '../services/webhook.service';

const webhookService = new WebhookService();

export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  await webhookService.handleWebhook(req, res);
};
