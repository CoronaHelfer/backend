import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const validatePassword = (password, passwordHash) => {
  return bcryptjs.compareSync(password, passwordHash);
};

const hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};

export function buildUserService({
  UserRepository,
  VerificationKeyRepository,
  MailingService,
  Environment,
}) {
  const register = async (profile, origin) => {
    if (
      !profile.email
      || !profile.password
      || !profile.firstName
      || !profile.lastName
    ) {
      throw { name: 'BadRequestError' };
    }

    profile.passwordHash = hashPassword(profile.password);

    const user = await UserRepository.create(profile);

    const verificationKey = await VerificationKeyRepository.create(user._id);

    await MailingService.sendVerificationMail(
      user.email,
      verificationKey.code,
      Environment.MAIL_TRANSPORTER,
      Environment.MAIL_ADDRESS,
      Environment.MAIL_ADDRESS_NAME,
      origin,
    );

    const secret = `${user.jwtSecret}${Environment.JWT_SECRET}`;
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: 86400 });

    return token;
  };

  const login = async credentials => {
    if (!credentials.email || !credentials.password) {
      throw { name: 'BadRequestError' };
    }

    const user = await UserRepository.queryOne({ email: credentials.email });

    if (!user) {
      throw { name: 'BadRequestError' };
    }

    if (!validatePassword(credentials.password, user.passwordHash)) {
      throw { name: 'UnauthorizedError' };
    }

    const secret = `${user.jwtSecret}${Environment.JWT_SECRET}`;
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: 86400 });

    return token;
  };

  const getProfile = async userId => {
    const result = await UserRepository.queryOne({ _id: userId });

    return result;
  };

  return {
    register,
    login,
    getProfile,
  };
}

import UserRepository from './user-repository';
import VerificationKeyRepository from '../verification-key/verification-key-repository';
import Environment from '../../environments';
import MailingService from '../../services/mailing-service';

export default buildUserService({
  UserRepository,
  VerificationKeyRepository,
  Environment,
  MailingService,
});
