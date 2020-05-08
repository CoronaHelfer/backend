import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../resources/auth/UserModel';
import Environment from '../environments';

const promisifiedVerify = promisify(jwt.verify);

export default async function checkAuthentication(req, res, next) {
  const errorMsg = { reason: 'Unauthorized access' };

  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    console.log('No token in request');
    return res.status(403).send(errorMsg);
  }

  const firstDecode = jwt.decode(token);

  if (!firstDecode) {
    console.log('Could not decode token');
    return res.status(403).send();
  }

  try {
    const user = await User.findOne({ _id: firstDecode._id });

    if (!user) {
      console.log('User was not found');
      return res.status(403).send(errorMsg);
    }

    const payload = await promisifiedVerify(token, `${user.jwtSecret}${Environment.JWT_SECRET}`);

    req.decoded = payload;
    req.decoded.verified = user.verified;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ error: error.message });
  }
}
