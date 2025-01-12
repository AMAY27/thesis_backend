import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from 'mongoose';

export class AlertLogCreationDto {

    alertId: string;
    triggerDate: Date;
    alertTitle: string;
    alertClass: string;

}