import axios from 'axios';
import { RAVEN_API_KEY, RAVEN_BASE_URL } from '../../config';  

class RavenService {
  private ravenClient;

  constructor() {
    this.ravenClient = axios.create({
      baseURL: RAVEN_BASE_URL,
      headers: {
        Authorization: `Bearer ${RAVEN_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }


  public async generateUniqueBankAccount(
    userId: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    amount: string
  ) {
    try {
      // Request to generate bank account with user details
      const response = await this.ravenClient.post('/pwbt/generate_account', {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        amount,
      });
      return response.data;  
    } catch (error: any) {
      console.error('Error generating unique bank account:', error);
      throw new Error(error.response?.data?.message || 'Failed to generate unique bank account');
    }
  }

 
 public async initiateTransfer(amount: number, bank: string, bankCode: string, currency: string) {
     try {
      const response = await this.ravenClient.post('/transfers/create', {
        amount,
        bank,
        bank_code: bankCode,
        currency,
      });
      return response.data; // Returns the transfer response
    } catch (error: any) {
      console.error('Error initiating transfer:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to initiate transfer');
    }
  }
}

export const ravenService = new RavenService();
