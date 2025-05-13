import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { EventDate } from './entities/date.entity';
import { ShuffleEvent } from './entities/event.entity';
import { Vote } from './entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'eventshuffleDB',
      entities: [ShuffleEvent, EventDate, Vote],
      synchronize: true,
    }),
    EventModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
