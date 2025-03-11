import Service from './services';
import * as Routes from './routes';
import { hono } from '../../config';

export const IPCalculator = hono();

IPCalculator.openapi(Routes.evaluateAddress, (c) => {
  const payload = c.req.valid('json');
  const data = Service.evaluateAddress(payload);

  return c.json({ ok: true, message: 'Request successful', data }, 200);
});
