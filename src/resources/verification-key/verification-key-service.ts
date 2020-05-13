export function buildVerificationKeyService({
  VerificationKeyRepository,
  UserRepository,
  Environment,
  MailingService,
}) {
  const verifyMail = async (code, userId) => {
    const verificationKey = await VerificationKeyRepository.queryOne({ code });

    if (!verificationKey) {
      throw { name: 'BadRequestError' };
    }

    const user = await UserRepository.queryOne({ _id: verificationKey.userId });

    if (user._id.toString() !== userId) {
      throw { name: 'ForbiddenError' };
    }

    user.verified = true;

    await UserRepository.update(user);
  };

  const resendMail = async (userId, origin) => {
    const user = await UserRepository.queryOne({ _id: userId });

    if (!user) {
      throw { name: 'BadRequestError' };
    }

    let verificationKey = await VerificationKeyRepository.queryOne({ userId: user._id });

    if (!verificationKey) {
      verificationKey = await VerificationKeyRepository.create(user._id);
    }

    await MailingService.sendVerificationMail(
      user.email,
      verificationKey.code,
      Environment.MAIL_TRANSPORTER,
      Environment.MAIL_ADDRESS,
      Environment.MAIL_ADDRESS_NAME,
      origin,
    );
  };

  return {
    verifyMail,
    resendMail,
  };
}

// Build the service by injecting the repository
import VerificationKeyRepository from './verification-key-repository';
import UserRepository from '../user/user-repository';
import Environment from '../../environments';
import MailingService from '../../services/mailing-service';

export default buildVerificationKeyService({
  VerificationKeyRepository,
  UserRepository,
  Environment,
  MailingService,
});
