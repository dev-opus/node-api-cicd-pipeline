import { OpenAPIHono } from '@hono/zod-openapi';
import { MalformedEntityException } from '../commons';

/**
 *
 * @description Hono instance to be used across the app
 *
 */
export const hono = () => {
  const app = new OpenAPIHono({
    defaultHook(result) {
      if (!result.success) {
        throw new MalformedEntityException(
          result.error.errors,
          'Improperly formatted request'
        );
      }
    },
  });

  app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
  });

  return app;
};
