import dotenv from 'dotenv';
const result = dotenv.config({ path: './.env' });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Parsed .env:', result.parsed);
}

export const JWT_SECRET = process.env.JWT_SECRET??""
export const RAVEN_API_KEY = process.env.RAVEN_API_KEY
export const RAVEN_BASE_URL=process.env.RAVEN_BASE_URL
export const WEB_HOOK=process.env.WEB_HOOK
export const PORT=process.env.PORT
export const DB_NAME= process.env.DB_NAME
export const DB_PASSWORD=process.env.DB_PASSWORD
export const  DB_USER =process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DB_CLIENT = 'mysql2'
export const ENVIRONMENT = process.env.NODE_ENV
