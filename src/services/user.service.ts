import { userDAO } from '../dao/user.dao';
import { ravenService } from './raven.service';

class UserService {
  async generateBankAccount(userId: number): Promise<string> {
    const bankAccount = await ravenService.generateUniqueBankAccount(
        String(userId),
        'John', 
        'Doe', 
        '1234567890',
        '1000',
        'john.doe@example.com' 
      );

    await userDAO.updateUserBankAccount(userId, bankAccount);
    return bankAccount;
  }

  async getUserDetails(userId: number): Promise<any> {
    return userDAO.findUserById(userId);
  }
}

export const userService = new UserService();
