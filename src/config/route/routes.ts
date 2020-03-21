
import AuthRoute from '../../app/auth/AuthRoute';
import UserRoute from '../../app/auth/UserRoute';
import DeleteRoute from '../../app/auth/DeleteRoute';

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
  {
    route: DeleteRoute,
    url: 'delete',
  }

];

export default Routes;
