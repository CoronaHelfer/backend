import RequestController from './request-controller';
import createRouter from '../../factories/create-router';
import checkAuthentication from '../../middlewares/check-authentication';
import checkVerification from '../../middlewares/check-verification';

export default createRouter({ Controller: RequestController })
.defineRoute('get', '/own', RequestController.getOwn, [checkAuthentication, checkVerification])
.withListRoute()
.settle();
