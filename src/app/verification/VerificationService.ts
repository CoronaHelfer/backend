import User from '../auth/UserModel';
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
}

export default new VerificationService();
