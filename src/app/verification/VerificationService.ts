import User from '../auth/UserModel';
import VerificationKey from './VerificationKeyModel';

class VerificationService {

  public async verifyMail(key: number) {
    const verificationKey = VerificationKey.findOne(key);
    if (!verificationKey) {
      throw new Error('key not found');
    }
    const user = await User.findOne(verificationKey.userId);
    user.verified = true;
    user.save();
    return 'success';
  }
}

export default new VerificationService();
