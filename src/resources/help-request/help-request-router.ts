import buildRouter from '../../utils/build-router';
import checkAuthentication from '../../middlewares/check-authentication';
import HelpRequestController from './help-request-controller';

const HelpRequestRouter = buildRouter([
  {
    method: 'get',
    path: '/',
    handler: HelpRequestController.getAllHelpRequests,
  },
  {
    method: 'get',
    path: '/own',
    guards: [checkAuthentication],
    handler: HelpRequestController.getOwnHelpRequests,
  },
]);

export default HelpRequestRouter;
