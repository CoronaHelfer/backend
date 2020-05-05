import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../app/auth/UserModel';
import Logger from './logger';
import Route from './route/route.index';
import Routes from './route/routes';

import { promisify } from 'util';

const promisifiedVerify = promisify(jwt.verify);

class ExpressMiddlerware {
  private exApp = express.Application;
  private config: any;

  public init(app, config) {
    this.config = config;
    this.exApp = app;
    this.parser();
    this.logger();

    const router = express.Router();
    this.router(router);
    this.exApp.use(Route.fullPath(), router);
  }

  public validateUser(isAuthGuard = true) {
    const errorMsg = { reason: 'Unauthorized access' };

    return async (req, res, next) => {
      if (!isAuthGuard) {
        return next();
      }

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

        const payload = await promisifiedVerify(token, `${user.jwtSecret}${this.config.JWT_SECRET}`);

        req.decoded = payload;
        req.decoded.verified = user.verified;

        return next();
      } catch (error) {
        console.log(error);
        return res.status(403).send({ error: error.message });
      }
    };
  }

  public isVerifiedUser(needsVerifiedAccount = true) {
    return async (req, res, next) => {
      if (!needsVerifiedAccount) {
        return next();
      }

      if (!req.decoded.verified) {
        return res.status(403).send('Account need to be verified');
      }

      return next();
    };
  }

  private parser() {
    this.exApp.use(cookieParser());
    this.exApp.use(bodyParser.urlencoded({extended: true}));
    this.exApp.use(bodyParser.json());
    this.exApp.use(cors());
  }

  private logger() {
    this.exApp.use(Logger.loggerMiddlerware);
    this.exApp.use(Logger.devLogger);
  }

  private router(router) {
    Routes.every((route) => {
      router.use(
        Route.getUrl(route.url),
        this.validateUser(route.guard),
        this.isVerifiedUser(route.needsVerifiedAccount),
        route.route,
      );

      return true;
    });
  }
}

export default new ExpressMiddlerware();
