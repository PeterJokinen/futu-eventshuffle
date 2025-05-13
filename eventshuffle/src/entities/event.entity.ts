import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EventDate } from './date.entity';

@Entity()
export class ShuffleEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => EventDate, (date) => date.event, { cascade: true, eager: true } )
  dates: EventDate[];

}