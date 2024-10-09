import { Sequelize } from 'sequelize';
import config from '../core/config';

export const getIntegratedDbClient = () => {
    const sequelize = new Sequelize(
        config.db.integrated.name,
        config.db.integrated.username,
        config.db.integrated.password,
        {
            host: config.db.integrated.host,
            port: config.db.integrated.port,
            dialect: config.db.integrated.dialect,
            pool: { max: config.db.integrated.pool, min: 5, idle: 20000, evict: 15000, acquire: 30000 },
            query: {
                raw: true,
            },
            logging: process.env.NODE_ENV === 'development',
            define: { timestamps: false },
        }
    );

    sequelize
        .authenticate()
        .then(() => {
            console.log('DATABASE CONNECTED');
        })
        .catch(err => {
            console.log(err);
        });

    return sequelize;
};
