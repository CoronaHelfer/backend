import mongoose from 'mongoose';
import Environment from '../environments';
import initCategories from './initCategories';

const config = Environment;

let binding;

if (process.env.BINDING) {
  binding = JSON.parse(process.env.BINDING);
}

if (!((binding) || (process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.DB_HOSTNAME &&
  process.env.DB_PORT && process.env.DB_CERT))) {
  console.error('ENVIRONMENT variable "BINDING" is not set! MongoDB must be bound to IBM Kubernetes Cluster.');
  process.exit(1);
}

const username = process.env.DB_USERNAME || binding.connection.mongodb.authentication.username;
const password = process.env.DB_PASSWORD || binding.connection.mongodb.authentication.password;
const connectionString = `mongodb://${username}:${password}@${process.env.DB_HOSTNAME || binding.connection.mongodb.hosts[0].hostname}:${process.env.DB_PORT || binding.connection.mongodb.hosts[0].port},host-2:32470/${config.DB_COLLECTION}?authSource=admin&replicaSet=replset&ssl=true`;
console.log(connectionString);

const ca = process.env.DB_CERT ? [Buffer.from(process.env.DB_CERT, 'base64')] :
  [Buffer.from(binding.connection.mongodb.certificate.certificate_base64, 'base64')];

const options = {
  ssl: true,
  sslValidate: true,
  sslCA: ca,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

class DBConnection {
  constructor() {
    this.connect();
  }

  private connect() {
    mongoose.connect(connectionString, options)
      .then(
        () => {
          console.log('Database connection successful');
          initCategories.start();
        },
        console.error.bind(console, 'Connection to the database could not be established:'),
      );
  }
}

export = DBConnection;
