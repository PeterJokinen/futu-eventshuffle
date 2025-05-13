import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShuffleEvent } from '../entities/event.entity'
import { EventDate } from 'src/entities/date.entity';
import { Vote } from 'src/entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShuffleEvent, EventDate, Vote])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
