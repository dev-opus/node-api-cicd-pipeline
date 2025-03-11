import { app } from './app';
import { env } from './config';
import { logger } from './commons/';
import { serve, ServerType } from '@hono/node-server';

let server: ServerType;
try {
  server = serve(
    {
      fetch: app.fetch,
      port: env.port,
    },
    (info) => {
      logger.log(
        env.log_level,
        `Server is running on http://localhost:${info.port}`
      );
    }
  );
} catch (error) {
  logger.error('Fatal error on startup', error);
  process.exit(1);
}

process.on('SIGINT', () => {
  logger.log(env.log_level, 'received shutdown signal...');
  server.close();
  logger.log(env.log_level, 'server shutdown!');
  process.exit(0);
});
