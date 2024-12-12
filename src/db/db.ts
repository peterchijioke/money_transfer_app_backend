import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

 const dbConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test_db',
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations', 
  },
  seeds: {
    // directory: './db/seeds', // Uncomment and add seed files here if needed
  },
};
const db = knex(dbConfig);

export default db
