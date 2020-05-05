import Environment from '../../config/environments';
import User from '../auth/UserModel';
import { MailService } from '../nodemailer/mailService';
import VerificationKey from './VerificationKeyModel';

class VerificationService {
  public async verifyMail(key: number, userId: string) {
    const verificationKey = await VerificationKey.findOne({ code: key });

    if (!verificationKey) {
      console.log('Could not find the verification key');
      throw new Error('400');
    }

    const user = await User.findOne({ _id: verificationKey.userId });

    if (user._id.toString() !== userId) {
      console.log('Not allowed to verify others users email');
      throw new Error('400');
    }

    user.verified = true;
    user.save();

    return 'success';
  }

  public async resendMail(userId: string, originHost: string) {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error('400');
    }

    let verificationKey = await VerificationKey.findOne({ userId });

    if (!verificationKey) {
      const newVerificationKey = new VerificationKey({ userId });
      verificationKey = await newVerificationKey.save();
    }

    const mailResponse = await MailService.sendVerificationMail(
      user.email,
      verificationKey.code,
      Environment.MAIL_TRANSPORTER,
      Environment.MAIL_ADDRESS,
      Environment.MAIL_ADDRESS_NAME,
      originHost,
    );

    console.log(mailResponse);

    return 'success';
  }
}

export default new VerificationService();
