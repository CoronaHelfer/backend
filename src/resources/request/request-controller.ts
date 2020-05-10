import createController from '../../factories/create-controller';
import RequestModel from './request-model';
import sendResponse from '../../utils/send-response';
import handleError from '../../utils/handle-error';
import Response from '../../utils/response';

import { mergeDeepRight } from 'ramda';
import { createQuery, createProjection, createListOptions } from '../../utils/mongoose-helpers';

const requestController = createController({ Model: RequestModel }) as any;

requestController.getOwn = sendResponse(handleError(async (req, res) => {
  const query = createQuery(req.query);
  const projection = createProjection(req.query);
  const options = createListOptions(req.query);

  const total = await RequestModel.countDocuments();

  const ownRequestsQuery = mergeDeepRight(query, { created_by: req.decoded._id });
  const entities = await RequestModel.find(ownRequestsQuery, projection, options);

  return Response.ok({
    total,
    count: entities.length,
    data: entities,
  });
}));

export default requestController;
