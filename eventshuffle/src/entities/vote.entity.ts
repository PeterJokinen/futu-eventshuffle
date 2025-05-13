import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { EventDate } from './date.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => EventDate)
  @JoinColumn()
  date: EventDate;

  @Column()
  person: string;

}