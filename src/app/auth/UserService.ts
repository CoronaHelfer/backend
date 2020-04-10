import jwt from 'jsonwebtoken';
import Environment from '../../config/environments';
import User from './UserModel';

const config = Environment;

class UserService {
  public user: any;

  public async findOne(q) {
    const projection = {
      __v: false,
      verification: false,
      passwordHash: false,
    };
    return await User.findOne(q, projection);
  }


  public async create(q) {
    const user = new User(q);
    if (!user.phoneNumber && !user.email) {
      throw new Error('Email or Phone number required');
    }
    user.passwordHash = user.createPasswordHash(q.password);
    this.user = await user.save();
    return this.generateJwt();
  }

  public async delete() {
    this.user.deleteOne();
    return 'successfully deleted';
  }

  public async isValidUser(q) {
    const email = q.email;
    const phoneNumber = q.phone;
    const password = q.password;

    const query = [];
    if (phoneNumber) {
      query.push({phoneNumber});
    }
    if (email) {
      query.push({email});
    }

    const user = await User.findOne({$or: query});
    if (user && user.validatePassword(password, user.passwordHash)) {
      this.user = user;
      return this.generateJwt();
    } else {
      throw new Error('User Not Found');
    }
  }


    public async saveFcmToken(fcmToken) {
        this.user.fcmToken = fcmToken;
        await this.user.save();
    }


  public generateJwt() {
    const secret = config.JWT_SECRET;
    const expiresIn = config.JWT_EXPIRE_TIME;


    const payload = {
      _id: this.user._id,
      email: this.user.email,
      fullName: this.user.fullName,
    };

    return jwt.sign(payload, secret, {expiresIn});
  }
}

export default new UserService();
