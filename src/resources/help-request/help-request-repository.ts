import { mergeDeepRight } from 'ramda';
import { createQuery, createProjection, createListOptions } from '../../utils/mongoose-helpers';

export function buildHelpRequestRepository({ HelpRequestModel }) {
  const queryAll = async queryParams => {
    const query = createQuery(queryParams);
    const projection = createProjection(queryParams);
    const options = createListOptions(queryParams);

    const total = await HelpRequestModel.countDocuments(query);
    const allHelpRequests = await HelpRequestModel.find(query, projection, options);

    return {
      total,
      count: allHelpRequests.length,
      page: queryParams.page ? Number(queryParams.page) : 1,
      pages: Math.ceil(total / allHelpRequests.length),
      data: allHelpRequests,
    };
  };

  const queryOwn = async (userId, queryParams) => {
    const query = createQuery(queryParams);
    const projection = createProjection(queryParams);
    const options = createListOptions(queryParams);

    const ownHelpRequestsQuery = mergeDeepRight(query, { created_by: userId });

    const total = await HelpRequestModel.countDocuments(ownHelpRequestsQuery);
    const ownHelpRequests = await HelpRequestModel.find(ownHelpRequestsQuery, projection, options);

    return {
      total,
      count: ownHelpRequests.length,
      page: queryParams.page ? Number(queryParams.page) : 1,
      pages: Math.ceil(total / ownHelpRequests.length),
      data: ownHelpRequests,
    };
  };

  return {
    queryAll,
    queryOwn,
  };
}

// Build the repository by injecting the model
import HelpRequestModel from './help-request-model';

export default buildHelpRequestRepository({ HelpRequestModel });
