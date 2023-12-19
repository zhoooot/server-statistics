import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from 'src/redis/redisRepository';

@Injectable()
export class StatService {
    constructor(@Inject(RedisRepository) private readonly redisRepo : RedisRepository) {}

    private serializeDate(date: Date) : string {
        //date format: YYYY-MM-DD
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        //fill with 0
        const month_str = month < 10 ? '0' + month : month;
        const day_str = day < 10 ? '0' + day : day;
        return `${year}-${month_str}-${day_str}`;
    }

    async getUserStatFromOneWeek() {
        let result : [ {x : string, y: number} ];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const date_str = this.serializeDate(date);
            const user_count = await this.redisRepo.get(date_str, 'user');
            result.push({x: date_str, y: parseInt(user_count)});
        }
    }

    async getUserStatFromOneMonth() {
        let result : [ {x : string, y: number} ];
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const date_str = this.serializeDate(date);
            const user_count = await this.redisRepo.get(date_str, 'user');
            result.push({x: date_str, y: parseInt(user_count)});
        }
    }

    async updateUserStat() {
        // create if not exists, set expiration 32 days later
        const date = new Date();
        const date_str = this.serializeDate(date);
        if (this.redisRepo.exists(date_str, 'user')) {
            await this.redisRepo.setIfNotExists(date_str, 'user', '0');
            await this.redisRepo.expire(date_str, 'user', 32 * 24 * 60 * 60);
        }
        await this.redisRepo.increment(date_str, 'user');
    }

    async getQuizStatFromOneWeek() {
        let result : [ {x : string, y: number} ];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const date_str = this.serializeDate(date);
            const quiz_count = await this.redisRepo.get(date_str, 'quiz');
            result.push({x: date_str, y: parseInt(quiz_count)});
        }
    }

    async getQuizStatFromOneMonth() {
        let result : [ {x : string, y: number} ];
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const date_str = this.serializeDate(date);
            const quiz_count = await this.redisRepo.get(date_str, 'quiz');
            result.push({x: date_str, y: parseInt(quiz_count)});
        }
    }

    async updateQuizStat() {
        // create if not exists, set expiration 32 days later
        const date = new Date();
        const date_str = this.serializeDate(date);
        if (!this.redisRepo.exists(date_str, 'quiz')) {
            await this.redisRepo.setIfNotExists(date_str, 'quiz', '0');
            await this.redisRepo.expire(date_str, 'quiz', 32 * 24 * 60 * 60);
        }
        await this.redisRepo.increment(date_str, 'quiz');
    }
}