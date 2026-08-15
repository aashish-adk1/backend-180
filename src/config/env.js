import "dotenv/config";

const requiredEnv = [
  "PORT",
  "NODE_ENV",
  "JWT_SECRET",
  "DB_HOST",
  "DB_PORT",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_USER",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
