import fs from 'fs';
import mongoose from 'mongoose';
import Environment from '../environments';

const config = Environment;
const dbConectionString = config.DB_URL;
const certPath = config.CERT_PATH;

class DBConection {
    constructor() {
        const key = fs.readFileSync(certPath);

        mongoose.connect(dbConectionString, {
            sslCA: key,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

    public errorHandler() {
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.info(`${dbConectionString} DB is Connected with this App`);
        });
    }
}

export = DBConection;
