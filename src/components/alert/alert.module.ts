import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Alert, AlertSchema } from "./schemas/alert.schema";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { AlertController } from "./alert.controller"; 
import { AlertService } from "./alert.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Alert.name, schema: AlertSchema }]),
        PassportModule,
        ConfigModule,
    ],
    controllers: [AlertController],
    providers: [AlertService],
})

export class AlertModule {}