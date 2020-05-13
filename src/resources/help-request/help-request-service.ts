export function buildHelpRequestService({ HelpRequestRepository }) {
  const listAllHelpRequests = async (userId, query) => {
    const result = await HelpRequestRepository.queryAll(userId, query);

    return result;
  };

  const listOwnHelpRequests = async (userId, query) => {
    const result = await HelpRequestRepository.queryOwn(userId, query);

    return result;
  };

  return {
    listAllHelpRequests,
    listOwnHelpRequests,
  };
}

// Build the service by injecting the repository
import HelpRequestRepository from './help-request-repository';

export default buildHelpRequestService({ HelpRequestRepository });
