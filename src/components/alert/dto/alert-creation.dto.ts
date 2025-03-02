import { ApiProperty } from "@nestjs/swagger";

export class AlertCreationDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    classname: string;

    @ApiProperty()
    alert_type: string;

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