import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET?? 'your_jwt_secret';
export const RAVEN_API_KEY = process.env.RAVEN_API_KEY ?? 'your_raven_api_key';
export const RAVEN_BASE_URL=process.env.RAVEN_BASE_URL??""
export const WEB_HOOK=process.env.WEB_HOOK??'https://webhook.site/1b350e5e-6a4d-42e7-be17-b3a8f0b2b37b'
