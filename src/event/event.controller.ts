import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AllResultsDto, CreateEventDto, EventDto, FullEventDto, AddVoteData } from 'src/models';
import { EventService } from './event.service';

@Controller('api/v1/event')
export class EventController {
    constructor( private eventService: EventService) {}

    @Get('list')
    async getAllEvents(): Promise<EventDto[]> {
        return await this.eventService.findAll();
    }

    @Post()
    async createEvent(@Body() event: CreateEventDto): Promise<{ "id": number }> {
        return await this.eventService.createEvent(event)
    }

    @Get(':id')
    async getEvent(@Param('id') eventid: number): Promise<FullEventDto | undefined> {
        return await this.eventService.getEvent(eventid)
    }

    @Post(':id/vote')
    async addVote(@Body() data: AddVoteData, @Param('id') eventid: number): Promise<FullEventDto | undefined> {
        return await this.eventService.addVote(data, eventid)
    }

    @Get(':id/results')
    async eventResults(@Param('id') eventid: number): Promise<AllResultsDto | undefined>{
        return await this.eventService.eventResults(eventid)
    }

    
}
