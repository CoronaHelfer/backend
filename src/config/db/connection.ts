import fs from 'fs';
import mongoose from 'mongoose';
import Environment from '../environments';

const config = Environment;
const dbConnectionString = `mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_URL}:${config.DB_PORT}/${config.DB_COLLECTION}?authSource=admin&replicaSet=replset&ssl=true`;
const certPath = config.CERT_PATH;

class DBConnection {
    constructor() {
        const key = fs.readFileSync(certPath);

        mongoose.connect(dbConnectionString, {
            sslCA: key,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).catch((error) => console.error('Connection to the database could not be established:', error));
    }

    public errorHandler() {
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.info(`${dbConnectionString} DB is Connected with this App`);
        });
    }
}

export = DBConnection;
