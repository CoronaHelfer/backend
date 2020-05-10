import { isValidObjectId } from 'mongoose';
import { isNil } from 'ramda';
import Response from '../utils/response';
import sendResponse from '../utils/send-response';
import handleError from '../utils/handle-error';

import {
  createQuery,
  createProjection,
  createListOptions,
} from '../utils/mongoose-helpers';

export default function createController({ Model }) {
  const create = sendResponse(handleError(async (req, res) => {
    const entity = await Model.create(req.body);

    return Response.created(entity);
  }));

  const list = sendResponse(handleError(async (req, res) => {
    const query = createQuery(req.query);
    const projection = createProjection(req.query);
    const options = createListOptions(req.query);

    const total = await Model.countDocuments();
    const entities = await Model.find(query, projection, options);

    return Response.ok({
      total,
      count: entities.length,
      data: entities,
    });
  }));

  const read = sendResponse(handleError(async (req, res) => {
    if (isNil(req.params.id)) {
      return Response.badRequest({ message: 'No ObjectId provided' });
    }

    if (!isValidObjectId(req.params.id)) {
      return Response.badRequest({ message: 'The provided ObjectId is invalid' });
    }

    const entity = await Model.findOne({ _id: req.params.id });

    if (!entity) {
      return Response.notFound();
    }

    return Response.ok(entity);
  }));

  const put = sendResponse(handleError(async (req, res) => {
    if (isNil(req.params.id)) {
      return Response.badRequest({ message: 'No ObjectId provided' });
    }

    if (!isValidObjectId(req.params.id)) {
      return Response.badRequest({ message: 'The provided ObjectId is invalid' });
    }

    const entity = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!entity) {
      return Response.notFound();
    }

    return Response.ok(entity);
  }));

  const remove = sendResponse(handleError(async (req, res) => {
    if (isNil(req.params.id)) {
      return Response.badRequest({ message: 'No ObjectId provided' });
    }

    if (!isValidObjectId(req.params.id)) {
      return Response.badRequest({ message: 'The provided ObjectId is invalid' });
    }

    const entity = await Model.findById(req.params.id);

    if (!entity) {
      return Response.notFound();
    }

    entity.remove();

    return Response.ok(entity);
  }));

  return {
    create,
    list,
    read,
    put,
    remove,
  };
}
