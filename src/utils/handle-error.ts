import Response from './response';

export default λ => async function handleError(req, res) {
  try {
    return await λ(req, res);
  } catch (error) {
    if (error.name === 'BadRequestError') {
      return Response.badRequest();
    }

    if (error.name === 'NotFoundError') {
      return Response.notFound();
    }

    if (error.name === 'UnauthorizedError') {
      return Response.unauthorized();
    }

    if (error.name === 'ForbiddenError') {
      return Response.forbidden();
    }

    if (error.name === 'ValidationError') {
      return Response.badRequest();
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      return Response.conflict();
    }

    console.error(error);

    return Response.serverError();
  }
};
