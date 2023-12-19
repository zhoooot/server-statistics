import { Controller, Get, Inject } from '@nestjs/common';
import { StatService } from './stat.service';

@Controller('stat')
export class StatController {
    constructor(@Inject(StatService) private readonly statService: StatService) {
    }

    @Get("user/week")
    async getUserStatFromOneWeek() {
        return await this.statService.getUserStatFromOneWeek();
    }

    @Get("user/month")
    async getUserStatFromOneMonth() {
        return await this.statService.getUserStatFromOneMonth();
    }

    @Get("quiz/week")
    async getQuizStatFromOneWeek() {
        return await this.statService.getQuizStatFromOneWeek();
    }

    @Get("quiz/month")
    async getQuizStatFromOneMonth() {
        return await this.statService.getQuizStatFromOneMonth();
    }
}
