

export class CustomEventAnalyticsResponseDto {
    customEventTitle: string;
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