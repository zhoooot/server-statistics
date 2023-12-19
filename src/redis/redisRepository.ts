import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { Redis } from "ioredis";
import { RedisRepositoryInterface } from "src/domain/redis.repository.interface";

@Injectable()
export class RedisRepository implements OnModuleDestroy, RedisRepositoryInterface {
    constructor(@Inject('REDIS') private readonly redisClient: Redis) {}

    get(prefix: string, key: string): Promise<string> {
        return this.redisClient.get(`${prefix}:${key}`);
    }

    async set(prefix: string, key: string, value: string): Promise<void> {
        await this.redisClient.set(`${prefix}:${key}`, value);
    }

    async delete(prefix: string, key: string): Promise<void> {
        await this.redisClient.del(`${prefix}:${key}`);
    }

    async setWithExpiry(prefix: string, key: string, value: string, expiry: number): Promise<void> {
        await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiry);
    }

    async setIfNotExists(prefix: string, key: string, value: string): Promise<boolean> {
        const result = await this.redisClient.set(`${prefix}:${key}`, value, 'NX');
        return result === 'OK';
    }

    async setIfExists(prefix: string, key: string, value: string): Promise<boolean> {
        const result = await this.redisClient.set(`${prefix}:${key}`, value, 'XX');
        return result === 'OK';
    }

    async increment(prefix: string, key: string): Promise<void> {
        await this.redisClient.incr(`${prefix}:${key}`);
    }

    async decrement(prefix: string, key: string): Promise<void> {
        await this.redisClient.decr(`${prefix}:${key}`);
    }

    async expire(prefix: string, key: string, expiry: number): Promise<void> {
        await this.redisClient.expire(`${prefix}:${key}`, expiry);
    }

    async persist(prefix: string, key: string): Promise<void> {
        await this.redisClient.persist(`${prefix}:${key}`);
    }

    async exists(prefix: string, key: string): Promise<boolean> {
        const result = await this.redisClient.exists(`${prefix}:${key}`);
        return result === 1;
    }

    onModuleDestroy() {
        this.redisClient.disconnect();
    }

}