import { hono } from '../config';
import { IPCalculator } from './calculator';

export const services = hono();

services.route('/calculate', IPCalculator);
