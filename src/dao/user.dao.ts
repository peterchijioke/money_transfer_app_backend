import knex from '../db/db';
import { User } from '../types/user.types';

class UserDAO {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return knex<User>('users').where({ email }).first();
  }

  async insertUser(user: Partial<User>): Promise<number> {
    const [insertedUserId] = await knex('users').insert(user);
    return insertedUserId;
  }

  async findUserById(id: number): Promise<User | undefined> {
    return knex<User>('users').where({ id }).first();
  }
   async updateUserBankAccount(userId: number, bankAccount: string): Promise<void> {
    await knex('users').where({ id: userId }).update({ bank_account: bankAccount });
  }
    async getAllUsers(): Promise<User[]> {
    return knex<User>('users').select('*');
  }
}

export const userDAO = new UserDAO();
