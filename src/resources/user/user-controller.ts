import Response from '../../utils/response';
import sendResponse from '../../utils/send-response';
import handleError from '../../utils/handle-error';

export function buildUserController({ UserService }) {
  const register = sendResponse(handleError(async httpRequest => {
    const profile = httpRequest.body;
    const origin = httpRequest.headers.origin;

    const result = await UserService.register(profile, origin);

    return Response.created(result);
  }));

  const login = sendResponse(handleError(async httpRequest => {
    const credentials = httpRequest.body;

    const result = await UserService.login(credentials);

    return Response.ok(result);
  }));

  const getOwnProfile = sendResponse(handleError(async httpRequest => {
    const result = await UserService.getProfile(httpRequest.decoded._id);

    return Response.ok(result);
  }));

  return {
    register,
    login,
    getOwnProfile,
  };
}

// Build the controller by injecting the service
import UserService from './user-service';

export default buildUserController({ UserService });
