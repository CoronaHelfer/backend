import AuthRoute from '../../app/auth/AuthRoute';
import UserRoute from '../../app/auth/UserRoute';
import CategoryRoute from '../../app/category/CategoryRoute';
import FlyerRoute from '../../app/FlyerGenerator/FlyerRoute';
import HelperRoute from '../../app/helper/HelperRoute';
import RequestPrivateRoute from '../../app/helpRequests/RequestPrivateRoute';
import RequestPublicRoute from '../../app/helpRequests/RequestPublicRoute';

const Routes = [
  {
    guard: true,
    route: UserRoute,
    url: 'users',
  }, {
    guard: true,
    route: FlyerRoute,
    url: 'flyer',
  },
  {
    guard: true,
    route: RequestPrivateRoute,
    url: 'request',
  },
  {
    guard: true,
    route: HelperRoute,
    url: 'request/helper',
  },
  {
    guard: false,
    route: RequestPublicRoute,
    url: 'publicRequest',
  },
  {
    guard: false,
    route: CategoryRoute,
    url: 'category',
  },
  {
    guard: false,
    route: AuthRoute,
    url: 'auth',
  },
];

export default Routes;
