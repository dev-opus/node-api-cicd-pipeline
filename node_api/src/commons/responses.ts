import { ZodType } from 'zod';
import { z } from '@hono/zod-openapi';

export function successResponse<TData extends ZodType>(
  data?: TData,
  message: string = 'Request successful'
) {
  if (data) {
    return {
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().openapi({ example: true }),
            message: z.string().openapi({ example: message }),
            data,
          }),
        },
      },
      description: 'Success Response',
    };
  }

  return {
    content: {
      'application/json': {
        schema: z.object({
          ok: z.boolean().openapi({ example: true }),
          message: z.string().openapi({ example: message }),
        }),
      },
    },
    description: 'Success Response',
  };
}

export function genericErrorResponse(message: string, description: string) {
  return {
    content: {
      'application/json': {
        schema: z
          .object({
            ok: z.boolean(),
            message: z.string(),
          })
          .openapi({
            example: {
              ok: false,
              message,
            },
          }),
      },
    },
    description,
  };
}

export function malformedErrorResponse() {
  return {
    content: {
      'application/json': {
        schema: z
          .object({
            ok: z.boolean(),
            message: z.string(),
            cause: z.array(z.object({ path: z.string(), message: z.string() })),
          })
          .openapi({
            example: {
              ok: false,
              message: 'Malformed Entity in Request Body',
              cause: [{ path: 'name', message: 'name is required' }],
            },
          }),
      },
    },
    description: 'Malformed Entity Error',
  };
}
