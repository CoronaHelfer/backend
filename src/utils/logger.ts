import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import Environment from '../environments';

export default function() {
  if (Environment.isDevelopment) {
    return morgan('dev');
  }

  const dir = path.join(process.cwd(), 'public/logs');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const accessLogStream = fs.createWriteStream(path.join(dir, 'access.log'), { flags: 'a' });

  return morgan('combined', { stream: accessLogStream });
}
