import { z } from '@hono/zod-openapi';

export const evaluateAddress = z
  .object({
    cidr: z.string(),

    host: z.string(),
    subnet: z.string(),

    network: z.string(),
    address: z.string(),

    subnet_block_size: z.number(),
    changing_octet_position: z.number(),
  })
  .openapi({
    example: {
      address: '192.168.1.10/24',

      cidr: '/24',
      host: '192.168.1.10',

      subnet: '255.255.255.0',
      network: '192.168.1.0',

      subnet_block_size: 246,
      changing_octet_position: 4,
    },
  });
