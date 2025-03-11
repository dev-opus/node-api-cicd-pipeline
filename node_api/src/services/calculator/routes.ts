import * as Commons from '../../commons';
import * as RequestSchema from './schema/request';
import * as ResponseSchema from './schema/response';
import { createRoute } from '@hono/zod-openapi';

const TAG = 'IP Calculator';

export const evaluateAddress = createRoute({
  method: 'post',
  path: '/',

  request: {
    body: Commons.genericBodyRequest(RequestSchema.evaluateAddress),
  },

  responses: {
    200: Commons.successResponse(ResponseSchema.evaluateAddress),
    422: Commons.malformedErrorResponse(),
  },

  tags: [TAG],
});
