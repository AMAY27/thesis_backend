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
}