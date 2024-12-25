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
    time_range: {
        start_time: string;
        end_time: string;
    };

    @ApiProperty()
    date_range: {
        start_date: Date;
        end_date: Date;
    };

    @ApiProperty()
    status: string;
}