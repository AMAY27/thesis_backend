import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { CustomEvent, CustomEventSchema } from "./schemas/customEvents.schema";
import { CustomEventsController } from "./custom-events.controller";
import { CustomEventsService } from "./custom-events.service";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: CustomEvent.name, schema: CustomEventSchema },
            ]
        ),
        PassportModule,
        ConfigModule,
    ],
    controllers: [CustomEventsController],
    providers: [CustomEventsService],
})

export class CustomEventsModule {}