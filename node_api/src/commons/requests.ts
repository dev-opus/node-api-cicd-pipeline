import { ZodType } from 'zod';
import { z } from '@hono/zod-openapi';

export function genericBodyRequest<TData extends ZodType>(schema: TData) {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description: 'Request Body',
  };
}

export function paginationQueryRequest() {
  return z
    .object({
      skip: z.string().refine((val) => refinePaginatorParam(val)),
      take: z.string().refine((val) => refinePaginatorParam(val)),
    })
    .partial()
    .openapi({
      example: {
        skip: '2',
        take: '25',
      },
    });
}

export function genericParamRequest(key: string, example: string) {
  return z
    .object({
      [key]: z.string(),
    })
    .openapi({
      param: {
        name: key,
        in: 'path',
      },
      example: {
        [key]: example,
      },
    });
}

function refinePaginatorParam(param: string) {
  return Number.isInteger(Number(param));
}
