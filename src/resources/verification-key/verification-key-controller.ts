import Response from '../../utils/response';
import sendResponse from '../../utils/send-response';
import handleError from '../../utils/handle-error';

export function buildVerificationKeyController({ VerificationKeyService }) {
  const verifyMail = sendResponse(handleError(async httpRequest => {
      await VerificationKeyService.verifyMail(httpRequest.query.key, httpRequest.decoded._id);

      return Response.ok();
  }));

  const resendMail = sendResponse(handleError(async httpRequest => {
    await VerificationKeyService.resendMail(httpRequest.decoded._id, httpRequest.headers.origin);

    return Response.ok();
  }));

  return {
    verifyMail,
    resendMail,
  };
}

// Build the controller by injecting the service
import VerificationKeyService from './verification-key-service';

export default buildVerificationKeyController({ VerificationKeyService });
