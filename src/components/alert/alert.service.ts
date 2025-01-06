import { from } from "rxjs";
import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlertCreationDto } from './dto/alert-creation.dto';
import { EventCreationDto } from './dto/event-creation.dto';
import { Alert } from './schemas/alert.schema';
import { Event } from "./schemas/event.schema";

@Injectable()
export class AlertService {
    private readonly logger = new Logger(AlertService.name);
    constructor(
        @InjectModel(Alert.name) private alertModel: Model<Alert>,
        @InjectModel(Event.name) private eventModel: Model<Event>
    ) {}

    async createAlert(
        alertDto: AlertCreationDto,
    ): Promise<{ message: string , statusCode: number}> {
        try {
            const newAlert = new this.alertModel({
                ...alertDto,
            });
            await newAlert.save();
            return { 
                message: 'Alert created successfully', 
                statusCode: HttpStatus.CREATED, 
            };
        } catch (error) {
            this.logger.error(`Error while creating alert: ${error.message}`);
            throw error;
        }
    }

    async createEvent(
        eventDto: EventCreationDto,
    ): Promise<{ message: string , statusCode: number}> {
        try {
            const newEvent = new this.eventModel({
                ...eventDto,
            });
            await newEvent.save();
            return { 
                message: 'Event created successfully', 
                statusCode: HttpStatus.CREATED, 
            };
        } catch (error) {
            this.logger.error(`Error while creating event: ${error.message}`);
            throw error;
        }
    }
    

    // Logic to check for alerts and send notifications
    async checkAlertandSendNotification(): Promise<Event[]> {
        const current = new Date();
        const currTime = current.toLocaleTimeString();
        const currDate = current.toISOString().split('T')[0];
        const alerts = await this.alertModel.find().exec();

        //Fetch all events that are within the date range of the alert
        alerts.map((alert) => {
            const event = this.eventModel.find({
                Datetime: { $gte: alert.date_range.start_date, $lte: alert.date_range.end_date },
                Klassenname: alert.classname,
                new_date: "00:00:08"
            }).exec();
            // Notification service function call
        })
        const events = await this.eventModel.find({
            Datetime: "01-05-2022 00:00",
            Klassenname: "Ruhe",
            Confidence: 0.5062
        }).exec();
        this.logger.log(`Checking for alerts at ${currTime} on ${currDate}`);
        return events;

    }
    // Function to add the alert in the datatbase when the alert is triggered
    async addingTriggeredAlerts({alertId, date_time}) {

    }

    async getAlerts(): Promise<Alert[]> {
        return await this.alertModel.find().exec();
    }

    //Custom queries for how many times the event class has been detected.
    


}