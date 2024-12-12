import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET?? 'your_jwt_secret';
export const RAVEN_API_KEY = process.env.RAVEN_API_KEY ?? 'your_raven_api_key';
export const RAVEN_BASE_URL=process.env.RAVEN_API_KEY??""
