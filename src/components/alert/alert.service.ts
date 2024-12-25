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

@Injectable()
export class AlertService {
    private readonly logger = new Logger(AlertService.name);
    constructor(
        @InjectModel(Alert.name) private alertModel: Model<Alert>
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

    async getAlerts(): Promise<Alert[]> {
        return await this.alertModel.find().exec();
    }
}