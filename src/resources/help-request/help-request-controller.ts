import Response from '../../utils/response';
import sendResponse from '../../utils/send-response';
import handleError from '../../utils/handle-error';

export function buildHelpRequestController({ HelpRequestService }) {
  const getAllHelpRequests = sendResponse(handleError(async httpRequest => {
    const query = httpRequest.query;

    const result = await HelpRequestService.listAllHelpRequests(query);

    return Response.ok(result);
  }));

  const getOwnHelpRequests = sendResponse(handleError(async httpRequest => {
    const userId = httpRequest.decoded._id;
    const query = httpRequest.query;

    const result = await HelpRequestService.listOwnHelpRequests(userId, query);

    return Response.ok(result);
  }));

  return {
    getAllHelpRequests,
    getOwnHelpRequests,
  };
}

// Build the controller by injecting the service
import HelpRequestService from './help-request-service';

export default buildHelpRequestController({ HelpRequestService });
