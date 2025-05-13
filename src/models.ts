
export class EventDto {
    id?: number
    name: string
}

export class FullEventDto extends EventDto {
    dates: string[]
    votes?: VoteResult[]
}

export class CreateEventDto {
    name: string
    dates: string[]
}

export class AllResultsDto {
    id: number
    name: string
    suitableDates: VoteResult[]
}

export class AddVoteData {
    name: string
    votes: string[]
}

export class AddVoteResp {
    id: number
    name: string
    dates: string[]
    votes: VoteResult[]
}

export class VoteResult {
    date: string
    people: string[]
}

export class DateDto {
    id?: number
    date: string
}
