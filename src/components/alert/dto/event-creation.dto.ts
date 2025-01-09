import { ApiProperty } from "@nestjs/swagger";

export class EventCreationDto {

    @ApiProperty()
    index: number;
    
    @ApiProperty()
    Datetime: Date;

    @ApiProperty()
    Datetime_2: Date;

    @ApiProperty()
    Confidence: number;

    @ApiProperty()
    Klassenname: string;

    @ApiProperty()
    new_date: Date;
}

