import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { redisClientFactory } from 'src/redis/redisClientFactory';
import { RedisRepository } from 'src/redis/redisRepository';

@Module({
  controllers: [StatController],
  providers: [StatService, redisClientFactory, RedisRepository],
})
export class StatModule {}
