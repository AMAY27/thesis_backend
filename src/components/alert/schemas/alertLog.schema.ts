// filepath: /c:/Users/amay rajvaidya/Desktop/thesis_backend/backend-api/src/components/alert/schemas/alert-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class AlertLog extends Document {
    @Prop({ type: Types.ObjectId, required: true })
    alertId: Types.ObjectId;

    @Prop({ required: true })
    triggerDate: Date;

}

export const AlertLogSchema = SchemaFactory.createForClass(AlertLog);