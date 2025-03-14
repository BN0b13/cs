import { Sequelize } from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(process.env.PG_DATABASE_NAME, process.env.PG_USERNAME, process.env.PG_PASSWORD, { 
    dialect: 'postgres', 
    dialectModule: pg,
    dialectOptions: {},
    host: process.env.PG_URL,
    port: process.env.PG_PORT,
    pool: {
        max: 50
    }
});

export {
    sequelize
}