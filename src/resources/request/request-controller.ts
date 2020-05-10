import createController from '../../factories/create-controller';
import RequestModel from './request-model';
import sendResponse from '../../utils/send-response';
import handleError from '../../utils/handle-error';
import Response from '../../utils/response';

const requestController = createController({ Model: RequestModel }) as any;

requestController.getOwn = sendResponse(handleError(async (req, res) => {
  const requests = await RequestModel.find({ created_by: req.decoded._id });

  return Response.ok(requests);
}));

export default requestController;
