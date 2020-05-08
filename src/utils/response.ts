const makeResponseType = (status, options = {}) => (data = undefined) => ({ status, data, options });

export default {
  ok: makeResponseType(200),
  created: makeResponseType(201),
  badRequest: makeResponseType(400, { log: true }),
  unauthorized: makeResponseType(401, { log: true }),
  forbidden: makeResponseType(403, { log: true }),
  notFound: makeResponseType(404, { log: true }),
  conflict: makeResponseType(409, { log: true }),
  serverError: makeResponseType(500, { log: true }),
};
