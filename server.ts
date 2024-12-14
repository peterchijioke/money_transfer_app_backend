import { PORT } from './config';
import app from './src/app';
import dotenv from 'dotenv';

dotenv.config();




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
