import Response from './response';

export default λ => async function handleError(req, res) {
  try {
    return await λ(req, res);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return Response.badRequest({
        errors: Object.values(error.errors).map((error: any) => {
          return {
            path: error.path,
            kind: error.kind,
            message: error.message,
          };
        }),
      });
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      return Response.conflict({
        keyValue: error.keyValue,
      });
    }

    console.error(error);

    return Response.serverError(error);
  }
};
