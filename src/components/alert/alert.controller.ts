import {
    Body,
    Controller,
    Logger,
    Post,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertCreationDto } from './dto/alert-creation.dto';
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
}