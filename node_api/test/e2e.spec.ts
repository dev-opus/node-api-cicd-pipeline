import { app } from '../src/app';
import { expect, describe, it } from 'vitest';

describe('Subnet Culator Test Suite', () => {
  it('correctly evaluates a properly formatted cidr address', async () => {
    const expectedData = {
      cidr: '/24',
      host: '192.168.1.10',
      subnet: '255.255.255.0',
      network: '192.168.1.0',
      address: '192.168.1.10/24',
      subnet_block_size: 256,
      changing_octet_position: 4,
    };

    const res = await app.request('/api/calculate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: '192.168.1.10/24' }),
    });

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe('Request successful');
    expect(data.data).toStrictEqual(expectedData);
  });

  it('returns a validation error response for an improperly formatted cidr address', async () => {
    const expectedCause = [
      {
        path: 'address',
        message: 'Invalid cidr',
      },
    ];

    const res = await app.request('/api/calculate', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: '192.168.1.10/33' }), // /33 is an out of range CIDR
    });

    const data = await res.json();

    expect(res.status).toBe(422);
    expect(data.message).toBe('Improperly formatted request');
    expect(data.cause).toStrictEqual(expectedCause);
  });
});
