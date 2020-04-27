import jwt from 'jsonwebtoken';
import Environment from '../../config/environments';
import User from './UserModel';

const config = Environment;

class UserService {
  public user: any;

  public async findOne(q) {
    const projection = {
      __v: false,
      passwordHash: false,
      jwtSecret: false,
    };
    const user = await User.findOne(q, projection);
    if (!user) {
      throw Error('User not found');
    }
    return user;
  }

  public async create(q) {
    const user = new User(q);
    if (!user.phoneNumber && !user.email) {
      throw new Error('400');
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
    if (!user) {
      throw new Error('404');
    }

    if (user.validatePassword(password, user.passwordHash)) {
      this.user = user;

      return this.generateJwt();
    } else {
      throw new Error('401');
    }
  }

  public async saveFcmToken(fcmToken) {
    this.user.fcmToken = fcmToken;
    await this.user.save();
  }

  public generateJwt() {
    const secret = `${this.user.jwtSecret}${config.JWT_SECRET}`;
    const expiresIn = 86400; // 24h

    const payload = {
      _id: this.user._id,
      email: this.user.email,
      fullName: this.user.fullName,
    };

    return jwt.sign(payload, secret, {expiresIn});
  }

  public async findOneWithProjection(q, projection) {
    return await User.findOne(q, projection);
  }

  public async updateProfile(
    city: string,
    street: string,
    streetNr: string,
    plz: number,
    picture: string,
    userId: string,
  ) {

    const user = await User.findOne({_id: userId});

    user.address = { city, street, plz, street_nr: streetNr };

    if (picture) {
      user.picture = picture;
    }

    user.save();

    return user;
  }
}

export default new UserService();
