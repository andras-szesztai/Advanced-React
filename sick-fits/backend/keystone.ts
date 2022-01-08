import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const dataBaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365,
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: dataBaseURL,
  },
  lists: createSchema({}),
  ui: {
    isAccessAllowed: () => true,
  },
});
