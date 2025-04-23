import dotenv from 'dotenv';

dotenv.config();

const config = {
    app: {
        port: process.env.PORT,
    },
    database: {
        mongodb: {
            uri: process.env.MONGODB_URI,
            options: {
                user: process.env.MONGODB_USER,
                pass: process.env.MONGODB_PASS,
                authSource: process.env.MONGODB_AUTH_SOURCE,
                dbName: process.env.MONGODB_DB_NAME,
            },
        }
    }
}

export default config; 