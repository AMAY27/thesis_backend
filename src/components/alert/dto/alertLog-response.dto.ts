import { AlertCreationDto } from "./alert-creation.dto";
import { AlertLogCreationDto } from "./alertLog-creation.dto";
import { Date } from "mongoose";

export class AlertLogResponseDto{
    title: string;
    classname: string;
    alert_type: string;
    start_date: Date;
    end_date: Date;
    start_time: string;
    end_time: string;
    status: string;
    createdAt: Date;
    alertLogs: AlertLogCreationDto[]
}