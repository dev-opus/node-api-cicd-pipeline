import { hono } from '../config';
import { cors } from 'hono/cors';
import { logger } from '../commons';
import { services } from '../services';
import { logger as httpLogger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import { apiReference } from '@scalar/hono-api-reference';

export const app = hono();

app.use(cors());
app.use(httpLogger());

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Subnet Calculator',
    description: 'An IPv4 Subnet Calculator REST API',
  },
});

app.get(
  '/docs',
  apiReference({
    theme: 'saturn',
    spec: { url: '/doc' },
  })
);

app.route('/api', services);

app.onError((error: any, c) => {
  logger.warn(error);

  if (error instanceof HTTPException) {
    return c.json(
      { ok: false, message: error.message, cause: error.cause },
      error.status
    );
  }

  return c.json(
    {
      ok: false,
      message: error.message || 'Internal Server error',
      cause: error.cause,
    },
    500
  );
});
