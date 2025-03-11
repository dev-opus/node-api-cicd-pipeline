import { z } from '@hono/zod-openapi';

export const evaluateAddress = z
  .object({
    address: z.string().cidr({ version: 'v4' }),
  })
  .openapi({
    example: {
      address: '192.168.1.10/24',
    },
  });

export type EvaluateAddressPayload = z.infer<typeof evaluateAddress>;
