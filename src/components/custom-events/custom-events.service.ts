import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomEventCreationDto } from './dto/customEvent-creation.dto';
import { Model } from 'mongoose';
import { CustomEvent } from './schemas/customEvents.schema';
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

    async checkEventOccurence(userId:string, customEventId:string): Promise<Event[]>{
        const currTime = moment("05:30:00",  'HH:mm:ss').format('HH:mm:ss');
        const currDate = moment("2022-05-04", 'YYYY-MM-DD').format('YYYY-MM-DD');
        this.logger.log(`Checking for alerts at ${currTime} on ${currDate}`);
        // const customEvents = await this.customEventModel.find({user_id: userId}).exec();
        // for (const customEvent of customEvents){
        //     const events = await this.eventModel.find({
        //         Datetime: currDate,
        //         Klassenname: customEvent.classname,
        //         time: { $gte: customEvent.start_time, $lte: customEvent.end_time },
        //     })
        // }
        let results = []
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
            })
            results.push(events);
        }
        return results;
    }
    
}