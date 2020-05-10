import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../resources_deprecated/auth/UserModel';
import Environment from '../environments';

const promisifiedVerify = promisify(jwt.verify);

export default async function checkAuthentication(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send();
  }

  const firstDecode = jwt.decode(token);

  if (!firstDecode) {
    return res.status(403).send();
  }

  const user = await User.findOne({ _id: firstDecode._id });

  if (!user) {
    return res.status(403).send();
  }

  try {
    const payload = await promisifiedVerify(token, `${user.jwtSecret}${Environment.JWT_SECRET}`);

    req.decoded = payload;
    req.decoded.verified = user.verified;

    return next();
  } catch (error) {
    console.log(error);

    return res.status(403).send();
  }
}
