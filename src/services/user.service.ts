import { userDAO } from '../dao/user.dao';
import { ravenService } from './raven.service';

class UserService {
 async generateBankAccount(userId: number,amount:number): Promise<string> {
  const user = await userDAO.findUserById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  const payload = {
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    amount: amount,
    email: user.email
  };
  const bankAccount = await ravenService.generateUniqueBankAccount(payload);
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
