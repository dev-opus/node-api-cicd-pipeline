import type { ZodIssue } from 'zod';
import { HTTPException } from 'hono/http-exception';

export class BadRequestException extends HTTPException {
  constructor(message?: string) {
    super(400, { message: message || 'Bad Request' });
  }
}

export class MalformedEntityException extends HTTPException {
  constructor(casue: ZodIssue[], message?: string) {
    super(422, {
      message: message || 'Malformed Entity',
      cause: formatZodIssues(casue),
    });
  }
}

function formatZodIssues(issues: ZodIssue[]) {
  return issues.map((issue) => {
    return { path: issue.path.join(':'), message: issue.message };
  });
}
