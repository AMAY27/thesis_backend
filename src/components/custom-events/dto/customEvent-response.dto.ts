import { Date } from "mongoose";

export class CustomEventResponseDto {
    id: string;
    title: string;
    classname: string;
    start_date: Date;
    end_date: Date;
    start_time: string;
    end_time: string;
    status: string;
}