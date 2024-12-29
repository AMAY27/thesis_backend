import { ApiProperty } from "@nestjs/swagger";

export class EventCreationDto {

    @ApiProperty()
    index: number;
    
    @ApiProperty()
    Datetime: string;

    @ApiProperty()
    Datetime_2: string;

    @ApiProperty()
    Confidence: number;

    @ApiProperty()
    Klassenname: string;

    @ApiProperty()
    new_date: string;
}

