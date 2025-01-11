import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Alert, AlertSchema } from "./schemas/alert.schema";
import { Event, EventSchema } from "./schemas/event.schema";
import { AlertLog, AlertLogSchema } from "./schemas/alertLog.schema";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { AlertController } from "./alert.controller"; 
import { AlertService } from "./alert.service";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: Alert.name, schema: AlertSchema },
                { name: Event.name, schema: EventSchema },
                { name: AlertLog.name, schema: AlertLogSchema },
            ]
        ),
        PassportModule,
        ConfigModule,
    ],
    controllers: [AlertController],
    providers: [AlertService],
})

export class AlertModule {}