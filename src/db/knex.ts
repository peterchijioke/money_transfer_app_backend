
import { DB_CLIENT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../../config';


const conf = {
  client: DB_CLIENT,
  connection: {
   host: DB_HOST,
  user:DB_USER ,
  password: DB_PASSWORD,
  database:DB_NAME
  },
  migrations: {
    directory:  './migrations', 
    extension: 'ts',
  },
};


export default conf