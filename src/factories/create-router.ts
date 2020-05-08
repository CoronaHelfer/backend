import { always } from 'ramda';
import express from 'express';

export default function createRouter({ Controller }) {
  let RouterFactory;

  const router = express.Router();

  function withCreateRoute(guards) {
    return RouterFactory.defineRoute('post', '/', Controller.create, guards);
  }

  function withListRoute(guards) {
    return RouterFactory.defineRoute('get', '/', Controller.list, guards);
  }

  function withReadRoute(guards) {
    return RouterFactory.defineRoute('get', '/:id', Controller.read, guards);
  }

  function withPatchRoute(guards) {
    return RouterFactory.defineRoute('patch', '/', Controller.patch, guards);
  }

  function withPutRoute(guards) {
    return RouterFactory.defineRoute('put', '/', Controller.put, guards);
  }

  function withDeleteRoute(guards) {
    return RouterFactory.defineRoute('delete', '/:id', Controller.remove, guards);
  }

  function defineRoute(routerMethod, path, λ, guards = [(_, __, next) => next()]) {
    router[routerMethod](path, ...guards, λ);

    return RouterFactory;
  }

  RouterFactory = {
    defineRoute,

    withCreateRoute,
    withListRoute,
    withReadRoute,
    withPatchRoute,
    withPutRoute,
    withDeleteRoute,

    settle: always(Object.freeze(router)),
  };

  return RouterFactory;
}
