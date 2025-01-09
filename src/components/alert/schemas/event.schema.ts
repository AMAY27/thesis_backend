import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';

@Schema()
export class Event extends Document {
    @Prop({ required: true })
    index: number;
    
    @Prop({ type:Date, required: true })
    Datetime: Date;

    @Prop({type:Date, required: true })
    Datetime_2: Date;

    @Prop({ required: true })
    Confidence: number;

    @Prop({ required: true })
    Klassenname: string;

    @Prop({  required: true })
    time: string;

}

export const EventSchema = SchemaFactory.createForClass(Event);