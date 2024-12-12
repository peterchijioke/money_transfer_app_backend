
import dotenv from 'dotenv';

dotenv.config({ path: "../.env" });

const conf = {
  client: 'mysql2',
  connection: {
   host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME || 'transaction',
  },
  migrations: {
    directory:  './migrations', 
    extension: 'ts',
  },
};


export default conf