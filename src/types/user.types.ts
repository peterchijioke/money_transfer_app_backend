export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bank_account: string | null;
  created_at?: Date;
  updated_at?: Date;
}
