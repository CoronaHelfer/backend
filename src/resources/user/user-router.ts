import buildRouter from '../../utils/build-router';
import checkAuthentication from '../../middlewares/check-authentication';
import UserController from './user-controller';

const UserRouter = buildRouter([
  {
    method: 'post',
    path: '/register',
    handler: UserController.register,
  },
  {
    method: 'post',
    path: '/login',
    handler: UserController.login,
  },
  {
    method: 'get',
    path: '/me',
    guards: [checkAuthentication],
    handler: UserController.getOwnProfile,
  },
]);

export default UserRouter;
