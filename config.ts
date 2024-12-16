import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET
export const RAVEN_API_KEY = process.env.RAVEN_API_KEY
export const RAVEN_BASE_URL=process.env.RAVEN_BASE_URL
export const WEB_HOOK=process.env.WEB_HOOK
export const PORT=process.env.PORT??5000
export const DB_NAME= process.env.DB_NAME
export const DB_PASSWORD=process.env.DB_PASSWORD
export const  DB_USER =process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DB_CLIENT = 'mysql2'
export const ENVIRONMENT = process.env.NODE_ENV
