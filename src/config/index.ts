import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BECRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    access_expires_in: process.env.JWT_EXPIRES_IN,
  },
};
