import 'dotenv/config';

export default {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE_NAME,
    "seederStorage": "sequelize",
    "host": process.env.PG_URL,
    "port": process.env.PG_PORT,
    "dialect": "postgresql"
  },
  "test": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE_NAME,
    "seederStorage": "sequelize",
    "host": process.env.PG_URL,
    "port": process.env.PG_PORT,
    "dialect": "postgresql"
  },
  "production": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE_NAME,
    "seederStorage": "sequelize",
    "host": process.env.PG_URL,
    "port": process.env.PG_PORT,
    "dialect": "postgresql"
  }
}