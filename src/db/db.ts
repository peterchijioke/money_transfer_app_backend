import knex from 'knex';
import dbConfig from './knex';


const db = knex(dbConfig);

db('users').select('*').then(users => {
  console.log(users);
}).catch(err => {
  console.error(err);
});


export default db;
