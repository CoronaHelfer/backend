import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../app/auth/UserModel';
import Logger from './logger';
import Route from './route/route.index';
import Routes from './route/routes';

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

  public validateUser(isAuthGuard = true): boolean {
    const router = express.Router();
    const errorMsg = {reason: 'UnAuthorized Access'};
    router.use((req, res, next) => {
      if (isAuthGuard) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          res.status(403).send(errorMsg).end();
        } else {
          const firstDecode = jwt.decode(token);
          if (!firstDecode) {
            res.status(403).send();
          }
          User.findOne({_id: firstDecode._id}).then((user) => {
            jwt.verify(token, `${user.jwtSecret}${this.config.JWT_SECRET}`, (err, decoded) => {
              req.decoded = decoded;
              if (err) {
                errorMsg.reason = err;
                res.status(403).send(errorMsg);
              } else {
                next();
              }
            });
          }).catch((err) => {
            res.status(403).send({error: err.message});
          });
        }
      } else {
        next();
      }
    });
    return router;
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
      router.use(Route.getUrl(route.url), this.validateUser(route.guard), route.route);
      return true;
    });
  }
}

export default new ExpressMiddlerware();
