import { FactoryProvider, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import config from 'src/config';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: 'REDIS',
  useFactory: async () => {
    const client = new Redis(config.redisURL);
    client.on('connect', () => {
      Logger.log('Redis connected', 'redisClientFactory');
    });

    client.on('error', (err) => {
      Logger.error('Redis error', err, 'redisClientFactory');
    });

    return client;
  },
  inject: [],
};
