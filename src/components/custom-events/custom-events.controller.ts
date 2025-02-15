import {
    Body,
    Controller,
    Logger,
    Post,
    Get,
    Query
} from '@nestjs/common';
import { CustomEventsService } from './custom-events.service';
import { CustomEventCreationDto } from './dto/customEvent-creation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('custom-events')
@Controller('custom-events')
export class CustomEventsController {
    private readonly logger = new Logger(CustomEventsController.name);
    constructor(private readonly customEventsService: CustomEventsService) {}

    @Post('create')
    @ApiOperation({ 
        summary: 'Create custom event',
        description: 'Create a custom event',
    })
    async createCustomEvent(@Body() customEventCreationDto: CustomEventCreationDto) {
        this.logger.log(`Creating a custom event`);
        return await this.customEventsService.createCustomEvent(customEventCreationDto);
    }

    @Get('getCustomEvents')
    @ApiOperation({ 
        summary: 'Get custom events',
        description: 'Get custom events',
    })
    async getCustomEvents(@Query('userId') userId: string) {
        this.logger.log(`Getting custom events`);
        return await this.customEventsService.getCustomEvents(userId);
    }

    @Get('getEventAnalytics')
    @ApiOperation({ 
        summary: 'Get event analytics',
        description: 'Get event analytics',
    })
    async getEventAnalytics(@Query('userId') userId: string, @Query('customEventId') customEventId: string) {
        this.logger.log(`Getting event analytics`);
        return await this.customEventsService.checkEventOccurence(userId, customEventId);
    }

    @Get('getEventsMonitorData')
    @ApiOperation({
        summary: 'Get data for events monitor',
        description: 'Get data for events monitor',
    })
    async getDataForEventsMonitor(){
        return await this.customEventsService.getDataForEventsMonitor();
    }
}