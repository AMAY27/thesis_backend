import {
    Body,
    Controller,
    Logger,
    Post,
    Get,
    Query
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertCreationDto } from './dto/alert-creation.dto';
import { EventCreationDto } from './dto/event-creation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('alert')
@Controller('alert')
export class AlertController {
    private readonly logger = new Logger(AlertController.name);
    constructor(private readonly alertService: AlertService) {}

    @Post('create')
    @ApiOperation({ 
        summary: 'Create alert',
        description: 'Create an alert',
    })
    async createAlert(@Body() alertCreationDto: AlertCreationDto) {
        this.logger.log(`Creating an alert`);
        return await this.alertService.createAlert(alertCreationDto);
    }

    @Post('create-event')
    @ApiOperation({
        summary: 'Create event',
        description: 'Create an event',
    })
    async createEvent(@Body() eventCreationDto: EventCreationDto) {
        this.logger.log(`Creating an event`);
        return await this.alertService.createEvent(eventCreationDto);
    }

    @Get('test')
    @ApiOperation({ 
        summary: 'Test alert',
        description: 'Test an alert'
    })
    async testAlert() {
        this.logger.log(`Testing an alert`);
        return await this.alertService.checkAlertandSendNotification();
    }

    @Get('alerts')
    @ApiOperation({ 
        summary: 'Get alerts',
        description: 'Get all alerts'
    })
    async getAlerts() {
        this.logger.log(`Getting all alerts`);
        return await this.alertService.getAlerts();
    }

    @Get('alert-logs')
    @ApiOperation({
        summary: 'Get alert logs',
        description: 'Get all alert with matching alert_id'
    })
    async getAlertLogs(@Query('alertId') alertId: string) {
        this.logger.log(`Getting alert logs`);
        return await this.alertService.getAlertLogs(alertId);
    }


    @Get('notifications')
    @ApiOperation({ 
        summary: 'Get notifications',
        description: 'Get all notifications'
    })
    async getNotifications(@Query('userId') userId: string) {
        this.logger.log(`Getting all notifications`);
        return await this.alertService.fetchNotifications(userId);
    }
}


