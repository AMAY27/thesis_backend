import { ApiProperty } from "@nestjs/swagger";

export class AlertLogCreationDto {

    @ApiProperty()
    alertId: string;
    
    @ApiProperty()
    triggerDate: Date;

}