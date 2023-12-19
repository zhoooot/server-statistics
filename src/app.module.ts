import { Module } from '@nestjs/common';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [StatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
