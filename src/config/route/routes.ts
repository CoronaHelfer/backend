import AuthRoute from '../../app/auth/AuthRoute';
import UserRoute from '../../app/auth/UserRoute';
import CategoryRoute from '../../app/category/CategoryRoute';
import FlyerRoute from '../../app/FlyerGenerator/FlyerRoute';
import HelperRoute from '../../app/helper/HelperRoute';
import RequestPrivateRoute from '../../app/helpRequests/RequestPrivateRoute';
import RequestPublicRoute from '../../app/helpRequests/RequestPublicRoute';
import VerificationRoute from '../../app/verification/VerificationRoute';

const Routes = [
  {
    guard: true,
    needsVerifiedAccount: false,
    route: UserRoute,
    url: 'users',
  }, {
    guard: true,
    needsVerifiedAccount: true,
    route: FlyerRoute,
    url: 'flyer',
  },
  {
    guard: true,
    needsVerifiedAccount: true,
    route: RequestPrivateRoute,
    url: 'request',
  },
  {
    guard: true,
    needsVerifiedAccount: true,
    route: HelperRoute,
    url: 'request/helper',
  },
  {
    guard: false,
    needsVerifiedAccount: false,
    route: RequestPublicRoute,
    url: 'publicRequest',
  },
  {
    guard: false,
    needsVerifiedAccount: false,
    route: CategoryRoute,
    url: 'category',
  },
  {
    guard: false,
    needsVerifiedAccount: false,
    route: AuthRoute,
    url: 'auth',
  },
  {
    guard: true,
    needsVerifiedAccount: false,
    route: VerificationRoute,
    url: 'verify',
  },
];

export default Routes;
