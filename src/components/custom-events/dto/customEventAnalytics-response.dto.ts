import { CustomEventResponseDto } from "./customEvent-response.dto";


export class CustomEventAnalyticsResponseDto {
    customEventDetails: CustomEventResponseDto;
    frequencies: FrequenciesDto[];
}

export class FrequenciesDto {
    month: string;
    freq: number;
    dailyFrequency: DailyFrequencyDto[];
}

export class DailyFrequencyDto {
    date: string;
    count: number;
}