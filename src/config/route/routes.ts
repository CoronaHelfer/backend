
import AuthRoute from '../../app/auth/AuthRoute';
import UserRoute from '../../app/auth/UserRoute';
import CategoryRoute from '../../app/helpRequests/category/CategoryRoute';

const Routes = [
  {
    route: UserRoute,
    url: 'users',
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
