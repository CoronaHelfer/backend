
import AuthRoute from '../../app/auth/AuthRoute';
import UserRoute from '../../app/auth/UserRoute';

const Routes = [
  {
    route: UserRoute,
    url: 'users',
  },
  {
    guard: false,
    route: AuthRoute,
    url: 'auth',
  },

];

export default Routes;
