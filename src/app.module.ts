import { Module } from '@nestjs/common';
import { StatModule } from './stat/stat.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import config from './config';

@Module({
  imports: [
    StatModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        { name: 'user', type: 'fanout' },
        { name: 'quiz', type: 'fanout' },
      ],
      uri: config.rabbitMQURL,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
