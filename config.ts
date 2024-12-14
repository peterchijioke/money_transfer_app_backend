import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET?? 'your_jwt_secret';
export const RAVEN_API_KEY = process.env.RAVEN_API_KEY ?? 'your_raven_api_key';
export const RAVEN_BASE_URL=process.env.RAVEN_BASE_URL??""
export const WEB_HOOK=process.env.WEB_HOOK??'https://webhook.site/1b350e5e-6a4d-42e7-be17-b3a8f0b2b37b'
export const PORT=process.env.PORT??5000
export const DB_NAME= process.env.DB_NAME?? 'transaction'
export const DB_PASSWORD=process.env.DB_PASSWORD ?? '12345678'
export const  DB_USER =process.env.DB_USER ?? 'root'
export const DB_HOST = process.env.DB_HOST??'127.0.0.1'
export const DB_CLIENT = 'mysql2'
export const ENVIRONMENT = process.env.NODE_ENV
