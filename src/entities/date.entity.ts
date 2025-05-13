import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ShuffleEvent } from './event.entity';

@Entity()
export class EventDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @ManyToOne(() => ShuffleEvent, (event) => event.dates, { onDelete: 'CASCADE' })
  event: ShuffleEvent;
  
}