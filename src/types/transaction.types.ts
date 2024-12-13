export interface Transaction {
  id: number;
  user_id: number;
  type: 'deposit' | 'transfer';
  amount: number;
  status: 'pending' | 'completed' | 'failed';  
  reference: string;
  metadata?: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
}
