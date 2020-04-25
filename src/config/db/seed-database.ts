import { nAry } from 'ramda';

import connectDatabase from './connection';
import loadDatabase from './load-database';

connectDatabase();

import models from './declare-models';

loadDatabase(models, `${__dirname}/seeds/${process.env.NODE_ENV}`)
.then(nAry(0, console.log.bind(console, 'Success!')))
.catch(console.error.bind(console))
.then(process.exit.bind(process));
