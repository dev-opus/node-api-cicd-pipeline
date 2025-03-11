import { env } from '../config';
import { logger } from './logger';

export class Service {
  private logger: typeof logger;

  constructor(name: string) {
    this.logger = logger.child({ context: name });
  }

  /**
   *
   * @description Log method
   *
   */
  protected log(message: string, load: any = {}) {
    this.logger.child({ load }).log(env.log_level, message);
  }
}
