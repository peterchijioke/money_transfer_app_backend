export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  bank_account?: string;
  created_at?: Date;
  updated_at?: Date;
}
