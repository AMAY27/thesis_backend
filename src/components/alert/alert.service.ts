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

    async checkAlertandSendNotification(): Promise<Event[]> {
        const current = new Date();
        const currTime = current.toLocaleTimeString();
        const currDate = current.toISOString().split('T')[0];
        const alerts = await this.alertModel.find().exec();
        const events = await this.eventModel.find().exec();
        this.logger.log(`Checking for alerts at ${currTime} on ${currDate}`);
        return events;
        // Logic to check for alerts and send notifications

    }

    async getAlerts(): Promise<Alert[]> {
        return await this.alertModel.find().exec();
    }

    //Custom queries for how many times the event class has been detected.
    


}