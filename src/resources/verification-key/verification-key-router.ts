import buildRouter from '../../utils/build-router';
import VerificationKeyController from './verification-key-controller';

export default buildRouter([
  {
    method: 'get',
    path: '/',
    handler: VerificationKeyController.verifyMail,
  },
  {
    method: 'get',
    path: '/resend',
    handler: VerificationKeyController.resendMail,
  },
]);
