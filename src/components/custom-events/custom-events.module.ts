import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { CustomEvent, CustomEventSchema } from "./schemas/customEvents.schema";
import { EventSchema } from "../alert/schemas/event.schema";
import { CustomEventsController } from "./custom-events.controller";
import { CustomEventsService } from "./custom-events.service";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: CustomEvent.name, schema: CustomEventSchema },
                { name: Event.name, schema: EventSchema },
            ]
        ),
        PassportModule,
        ConfigModule,
    ],
    controllers: [CustomEventsController],
    providers: [CustomEventsService],
})

export class CustomEventsModule {}