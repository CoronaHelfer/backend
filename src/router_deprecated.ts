import authRouter from './resources_deprecated/auth/AuthRoute';
import userRouter from './resources_deprecated/auth/UserRoute';
import categoryRouter from './resources_deprecated/category/CategoryRoute';
import flyerRouter from './resources_deprecated/FlyerGenerator/FlyerRoute';
import helperRouter from './resources_deprecated/helper/HelperRoute';
import requestPrivateRouter from './resources_deprecated/helpRequests/RequestPrivateRoute';
import requestPublicRouter from './resources_deprecated/helpRequests/RequestPublicRoute';
import verificationRouter from './resources_deprecated/verification/VerificationRoute';

import express from 'express';
import checkAuthentication from './middlewares/check-authentication';
import checkVerification from './middlewares/check-verification';

const router = express.Router();

const routes = [
  {
    guard: true,
    needsVerifiedAccount: false,
    route: userRouter,
    url: '/users',
  },
  {
    guard: true,
    needsVerifiedAccount: true,
    route: flyerRouter,
    url: '/flyer',
  },
  {
    guard: true,
    needsVerifiedAccount: true,
    route: requestPrivateRouter,
    url: '/request',
  },
  {
    guard: true,
    needsVerifiedAccount: true,
    route: helperRouter,
    url: '/request/helper',
  },
  {
    guard: false,
    needsVerifiedAccount: false,
    route: requestPublicRouter,
    url: '/publicRequest',
  },
  {
    guard: false,
    needsVerifiedAccount: false,
    route: categoryRouter,
    url: '/category',
  },
  {
    guard: false,
    needsVerifiedAccount: false,
    route: authRouter,
    url: '/auth',
  },
  {
    guard: true,
    needsVerifiedAccount: false,
    route: verificationRouter,
    url: '/verify',
  },
];

routes.every(route => {
  router.use(
    route.url,
    route.guard ? checkAuthentication : (_, __, next) => next(),
    route.needsVerifiedAccount ? checkVerification : (_, __, next) => next(),
    route.route,
  );

  return true;
});

export default router;
