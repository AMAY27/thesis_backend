import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';

@Schema()
export class Event extends Document {
    @Prop({ required: true })
    Datetime: string;

    @Prop({ required: true })
    Datetime_2: string;

    @Prop({ required: true })
    Confidence: number;

    @Prop({ required: true })
    Klassenname: string;

    @Prop({  required: true })
    new_date: string;

}

export const EventSchema = SchemaFactory.createForClass(Event);