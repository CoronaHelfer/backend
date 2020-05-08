import express, { json } from 'express';
import cors from 'cors';

import logger from './utils/logger';
import router from './router';

import connectDatabase from './database/connect-database';
import Environment from './environments';

connectDatabase();

const server = express();

server
.use(cors())
.use(json())
.use(logger())
.use('/api/v1', router);

server.listen(Environment.PORT || 3000, () => {
  console.info(`Server running in ${process.env.NODE_ENV} mode on port ${Environment.PORT}`);
});
