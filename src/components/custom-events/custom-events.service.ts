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

@Injectable()
export class CustomEventsService {
    private readonly logger = new Logger(CustomEventsService.name);
    constructor(
        @InjectModel(CustomEvent.name) private customEventModel: Model<CustomEvent>, 
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
}