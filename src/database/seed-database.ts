import { nAry } from 'ramda';

import connectDatabase from './connect-database';
import loadDatabase from './load-database';

connectDatabase();

import models from './declare-models';

loadDatabase(models, `${__dirname}/seeds/development`)
.then(nAry(0, console.log.bind(console, 'Success!')))
.catch(console.error.bind(console))
.then(process.exit.bind(process));
