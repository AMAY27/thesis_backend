import { ApiProperty } from "@nestjs/swagger";

export class CustomEventCreationDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    classname: string;

    @ApiProperty()
    start_time: string;

    @ApiProperty()
    end_time: string;

    @ApiProperty()
    start_date: Date;

    @ApiProperty()
    end_date: Date;

    @ApiProperty()
    status: string;
}