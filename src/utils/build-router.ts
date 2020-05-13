import express from 'express';

export default function buildRouter(routes) {
  const router = express.Router();

  for (const route of routes) {
    router[route.method](route.path, ...(route.guards || [(_, __, next) => next()]), route.handler);
  }

  return Object.freeze(router);
}
