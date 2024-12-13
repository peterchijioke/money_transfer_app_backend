import { userDAO } from '../dao/user.dao';
import { ravenService } from './raven.service';

class UserService {
  async generateBankAccount(userId: number): Promise<string> {
    const bankAccount = await ravenService.generateUniqueBankAccount(
        String(userId),
        'John', 
        'Doe', 
        '1234567890',
        '100',
        'john.doe@example.com' 
      );

    await userDAO.updateUserBankAccount(userId, bankAccount);
    return bankAccount;
  }

  async getUserDetails(userId: number): Promise<any> {
    return userDAO.findUserById(userId);
  }
  async getAll(): Promise<any> {
  const users = await userDAO.getAllUsers();
  const {password,...rest}:any=users
  return {...rest};
  }
}

export const userService = new UserService();
