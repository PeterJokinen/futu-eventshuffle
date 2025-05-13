import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShuffleEvent } from '../entities/event.entity'
import { Repository } from 'typeorm';
import { CreateEventDto, FullEventDto, AddVoteData, AllResultsDto, VoteResult } from 'src/models';
import { Vote } from 'src/entities/vote.entity';
import { EventDate } from 'src/entities/date.entity';

@Injectable()
export class EventService {
    constructor( 
        @InjectRepository(ShuffleEvent) private eventRepository: Repository<ShuffleEvent>,
        @InjectRepository(EventDate) private dateRepository: Repository<EventDate>,
        @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    ) {}

    findAll(): Promise<ShuffleEvent[]> {
        return this.eventRepository.find();
    }

    async createEvent( event: CreateEventDto): Promise<{ "id": number }> {
        let eventDates: EventDate[] = []
        event.dates.forEach(async d => {
            let newDate = new EventDate()
            newDate.date = d
            eventDates.push(newDate)
        });
        let newEvent = new ShuffleEvent()
        eventDates.forEach(eD => eD.event = newEvent)
        newEvent.name = event.name
        newEvent.dates = eventDates
        const createdEvent = await this.eventRepository.save(newEvent)
        return { "id": createdEvent.id }
    }

    async getEvent(eventid: number): Promise<FullEventDto | undefined> {
        const event = await this.eventRepository.findOne({ where: { id: eventid } })
        if (event) {
            const allResults = await this.getEventVotes(eventid, event.dates);
            const returnObj: FullEventDto = {
                id: event.id,
                name: event.name,
                dates: event.dates.map(d => { return d.date} ),
                votes: allResults
            }
            return returnObj
        }
    }

    async addVote(data: AddVoteData, eventid: number): Promise<FullEventDto | undefined> {
        data.votes.forEach(async dateString => {
            const voteDate = await this.dateRepository.findOne({ where: {date: dateString, event: {id:eventid}} })
            if (voteDate) {
                let vEntity = this.voteRepository.create({
                    date: voteDate,
                    person: data.name
                })
                this.voteRepository.save(vEntity)
            }
        });
        const thisEvent = await this.eventRepository.findOne({where: {id:eventid}})
        const currentVotes = await this.voteRepository.find()
        if(thisEvent) {
            let returnObj: FullEventDto = {
                id: thisEvent.id,
                dates: thisEvent.dates.map(d => d.date),
                name: thisEvent.name,
                //votes: await this.getEventVotes(eventid, currentVotes.map(v => v.date))
            }
            return returnObj
        }
    }

    async eventResults(eventid: number): Promise<AllResultsDto | undefined> {
        const event = await this.eventRepository.findOne({ where: { id: eventid } })
        if(event) {
            const allVotes = await this.getEventVotes(eventid, event.dates);
            const allPeople: string[] = Array.from(new Set(allVotes.flatMap(entry => entry.people)));

            let returnObj: AllResultsDto = {
                id: event.id,
                name: event.name,
                suitableDates: allVotes.filter(v => v.people == allPeople)
            }
            return returnObj
        }
    }

    async getEventVotes(eventid: number, dates: EventDate[]): Promise<VoteResult[]> {
        let votes = await this.voteRepository.find({ where: { id: eventid } })
        let allResults: VoteResult[] = []
        dates.forEach(d => {
            allResults.push({date: d.date, people: votes.map(v => v.person )});
        });
        return allResults;
    }

    
}
