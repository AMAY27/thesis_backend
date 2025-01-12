// filepath: /c:/Users/amay rajvaidya/Desktop/thesis_backend/backend-api/src/components/alert/schemas/alert-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class AlertLog extends Document {
    @Prop({ required: true })
    alertId: string;

    @Prop({ required: true })
    triggerDate: Date;

    @Prop({ required: true })
    alertTitle: string;

    @Prop({ required: true })
    alertClass: string;

}

export const AlertLogSchema = SchemaFactory.createForClass(AlertLog);