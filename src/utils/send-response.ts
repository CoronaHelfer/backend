export default λ => async function sendResponse(req, res) {
  const response = await λ(req, res);

  if (response.options.log) {
    console.error(`[server] ${response.status} ${req.method} ${req.url}`);
  }

  return res.status(response.status).json(response.data);
};
