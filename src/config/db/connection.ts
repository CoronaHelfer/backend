import mongoose from 'mongoose';
import { once } from 'ramda';

import Environment from '../environments';

const config = Environment;

let binding;
let username;
let password;
let hostname;
let port;
let ca;
let connectionString;
let options;

if (process.env.NODE_ENV === 'production') {
  if (process.env.BINDING) {
    binding = JSON.parse(process.env.BINDING);
  }

  if (!((binding) || (process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.DB_HOSTNAME &&
    process.env.DB_PORT && process.env.DB_CERT))) {
    console.error('ENVIRONMENT variable "BINDING" is not set! MongoDB must be bound to IBM Kubernetes Cluster.');
    process.exit(1);
  }

  username = process.env.DB_USERNAME || binding.connection.mongodb.authentication.username;
  password = process.env.DB_PASSWORD || binding.connection.mongodb.authentication.password;
  hostname = process.env.DB_HOSTNAME || binding.connection.mongodb.hosts[0].hostname;
  port = process.env.DB_PORT || binding.connection.mongodb.hosts[0].port;

  ca = process.env.DB_CERT
    ? [Buffer.from(process.env.DB_CERT, 'base64')]
    : [Buffer.from(binding.connection.mongodb.certificate.certificate_base64, 'base64')];

  connectionString = `mongodb://${username}:${password}@${hostname}:${port},host-2:32470/${config.DB_COLLECTION}?authSource=admin&replicaSet=replset&ssl=true`;

  options = {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
} else {
  connectionString = 'mongodb://localhost:27097';

  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: 'coronahelfer-local',
  };
}

export default once(async () => {
  try {
    await mongoose.connect(connectionString, options);

    return mongoose.connection;
  } catch (error) {
    console.error(`Connection to the database could not be established: ${error}`);

    throw error;
  }
});
