import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomEventCreationDto } from './dto/customEvent-creation.dto';
import { CustomEventAnalyticsResponseDto as CustomEventResp } from './dto/customEventAnalytics-response.dto';
import { Model } from 'mongoose';
import { CustomEvent } from './schemas/customEvents.schema';
import { CustomEventResponseDto } from './dto/customEvent-response.dto';
import * as moment from 'moment';
import { Event } from '../alert/schemas/event.schema';

@Injectable()
export class CustomEventsService {
    private readonly logger = new Logger(CustomEventsService.name);
    constructor(
        @InjectModel(CustomEvent.name) private customEventModel: Model<CustomEvent>, 
        @InjectModel(Event.name) private eventModel: Model<Event>,
    ) {}

    async createCustomEvent(
        customEventDto: CustomEventCreationDto,
    ): Promise<{ message: string , statusCode: number, customEvents:CustomEvent[]}> {
        try {
            const newCustomEvent = new this.customEventModel({
                ...customEventDto,
            });
            await newCustomEvent.save();
            const customEvents = await this.customEventModel.find().exec();
            this.logger.log(`CustomEvent created successfully: ${customEvents}`);
            return { 
                message: 'CustomEvent created successfully', 
                statusCode: HttpStatus.CREATED, 
                customEvents,
            };
        } catch (error) {
            this.logger.error(`Error while creating customEvent: ${error.message}`);
            throw new HttpException(
                'Error while creating customEvent', 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getCustomEvents(userId:string): Promise<CustomEventResponseDto[]> {
        try {
            const customEvents = await this.customEventModel.find({user_id: userId}).exec();
            return customEvents.map((customEvent) => {
                return {
                    id: customEvent._id.toString(),
                    title: customEvent.title,
                    classname: customEvent.classname,
                    start_date: customEvent.start_date.toString().split('T')[0],
                    end_date: customEvent.end_date.toString().split('T')[0],
                    start_time: customEvent.start_time,
                    end_time: customEvent.end_time,
                    status: customEvent.status,
                };
            });
        } catch (error) {
            this.logger.error(`Error while fetching customEvents: ${error.message}`);
            throw new HttpException(
                'Error while fetching customEvents', 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async checkEventOccurence(userId:string, customEventId:string): Promise<CustomEventResp> {
        let results: CustomEventResp = { customEventTitle: '', frequencies: [] };
        const customEvent = await this.customEventModel.findOne({user_id: userId, _id: customEventId}).exec();
        if (!customEvent){
            this.logger.error(`CustomEvent with id ${customEventId} not found`);
            throw new HttpException(
                `CustomEvent with id ${customEventId} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        else{
            const events = await this.eventModel.find({
                Klassenname: customEvent.classname,
                Datetime: { $gte: customEvent.start_date, $lte: customEvent.end_date },
                time: { $gte: customEvent.start_time, $lte: customEvent.end_time },
            }).exec();
            const monthMap = new Map<string, { freq: number; dailyFrequency: Map<string, number> }>();
            events.forEach((event) => {
                const dt = new Date(event.Datetime.toString());
                const eventMoment = moment(dt.toISOString());
                const month = eventMoment.format("YYYY-MM"); // e.g. "2025-01"
                const day = eventMoment.format("YYYY-MM-DD");
                
                if (!monthMap.has(month)) {
                    monthMap.set(month, { freq: 0, dailyFrequency: new Map<string, number>() });
                }
                const monthData = monthMap.get(month);
                monthData.freq += 1;

                const currentCount = monthData.dailyFrequency.get(day) || 0;
                monthData.dailyFrequency.set(day, currentCount + 1);
            });
            const frequencies = Array.from(monthMap.entries()).map(([month, data]) => {
                const dailyFrequency = Array.from(data.dailyFrequency.entries()).map(([date, count]) => {
                  return { date, count };
                });
                return {
                  month,
                  freq: data.freq,
                  dailyFrequency,
                };
            });

            results = {
              customEventTitle: customEvent.title,
              frequencies,
            };
            // results.push(events);
        }
        return results ;
    }
    
}