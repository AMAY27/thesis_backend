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
import { AlertLogCreationDto } from './dto/alertLog-creation.dto';
import { Alert } from './schemas/alert.schema';
import { Event } from "./schemas/event.schema";
import { AlertLog } from "./schemas/alertLog.schema";
import { AlertLogResponseDto } from "./dto/alertLog-response.dto";
import * as moment from 'moment';
import { Date, Document, Types } from 'mongoose';

@Injectable()
export class AlertService {
    private readonly logger = new Logger(AlertService.name);
    constructor(
        @InjectModel(Alert.name) private alertModel: Model<Alert>,
        @InjectModel(Event.name) private eventModel: Model<Event>,
        @InjectModel(AlertLog.name) private alertLogModel: Model<AlertLog>,
    ) {}

    async createAlert(
        alertDto: AlertCreationDto,
    ): Promise<{ message: string , statusCode: number, alerts:Alert[]}> {
        try {
            // const formattedStartDate = moment(alertDto.start_date).format('DD-MM-YYYY HH:mm');
            // const formattedEndDate = moment(alertDto.end_date).format('DD-MM-YYYY HH:mm');
            // const formattedStartTime = moment(alertDto.start_time, 'HH:mm:ss').format('HH:mm:ss');
            // const formattedEndTime = moment(alertDto.end_time, 'HH:mm:ss').format('HH:mm:ss');
            const newAlert = new this.alertModel({
                ...alertDto,
            });
            await newAlert.save();
            const alerts = await this.alertModel.find().exec();
            this.logger.log(`Alert created successfully: ${alerts}`);
            return { 
                message: 'Alert created successfully', 
                statusCode: HttpStatus.CREATED, 
                alerts,
            };
        } catch (error) {
            this.logger.error(`Error while creating alert: ${error.message}`);
            throw new HttpException(
                'Error while creating alert', 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
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

    async createAlertLog(
        alertLogDto: AlertLogCreationDto,
    ): Promise<{ message: string , statusCode: number}> {
        try {
            const newAlertLog = new this.alertLogModel({
                ...alertLogDto,
            });
            await newAlertLog.save();
            return { 
                message: 'Alert log created successfully', 
                statusCode: HttpStatus.CREATED, 
            };
        } catch (error) {
            this.logger.error(`Error while creating alert log: ${error.message}`);
            throw error;
        }
    }
    

    // Logic to check for alerts and send notifications
    async checkAlertandSendNotification(): Promise<Event[]> {
        const current = new Date();
        // const currTime = current.toLocaleTimeString().split(' ')[0];
        // const currDate = moment(current).format('DD-MM-YYYY');
        const currTime = moment("05:30:00",  'HH:mm:ss').format('HH:mm:ss');
        const currDate = moment("2022-05-04", 'YYYY-MM-DD').format('YYYY-MM-DD');
        this.logger.log(`Checking for alerts at ${currTime} on ${currDate}`);
        const alerts:Alert[] = await this.alertModel.find({
            start_date: { $lte: new Date(currDate) },
            end_date: { $gte: new Date(currDate) },
            start_time: { $lte: currTime },
            end_time: { $gte: currTime },
        }).exec();
        this.logger.log(`No of alerts found: ${alerts.length}`);
        // const alerts = await this.alertModel.find().exec();
        let events = [];

        for (const alert of alerts) {
            const startDate = alert.start_date;
            const endDate = alert.end_date;
            events = await this.eventModel.find({
                Datetime: new Date(currDate),
                Klassenname: alert.classname,
                time: { $gte: alert.start_time, $lte: alert.end_time }
            }).exec();
            for (const event of events) {
                this.createAlertLog({  
                    alertId: alert._id as unknown as string, 
                    userId:alert.user_id as unknown as string, 
                    triggerDate: new Date(event.Datetime), 
                    alertTitle: alert.title, 
                    alertClass: alert.classname 
                });
            }
            // Notification service function call
        }
        this.logger.log(`No of events found: ${events.length}`);
        return events;

    }
    // Function to add the alert in the datatbase when the alert is triggered
    async addingTriggeredAlerts({alertId, date_time}) {
        
    }


    async fetchNotifications(userId: string){
        const currTime = moment("05:30:00",  'HH:mm:ss').format('HH:mm:ss');
        const currDate = moment("2022-05-04", 'YYYY-MM-DD').format('YYYY-MM-DD');
        const alerts = await this.alertLogModel.find({
            userId: userId,
            triggerDate: new Date(currDate),
        }).exec();
        return alerts;
    }
    

    async getAlerts(): Promise<Alert[]> {
        return await this.alertModel.find().exec();
    }

    async getAlertLogs(alert_id:string): Promise<AlertLogResponseDto> {
        const alert = await this.alertModel.findOne({_id: alert_id}).exec();
        const alertLogs = await this.alertLogModel.find({ alertId: alert_id }).exec();
        const resp:AlertLogResponseDto = {
            title: alert.title,
            classname: alert.classname,
            alert_type: alert.alert_type,
            start_date: alert.start_date,
            end_date: alert.end_date,
            start_time: alert.start_time,
            end_time: alert.end_time,
            status: alert.status,
            createdAt: alert.createdAt,
            alertLogs: alertLogs
        };
        return resp;
    }


    //Custom queries for how many times the event class has been detected.
    


}